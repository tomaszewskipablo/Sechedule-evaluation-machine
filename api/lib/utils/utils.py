import json
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import boto3
import s3fs
from io import StringIO


def get_unnecessary_columns():
    return ["Turnos com capacidade superior à capacidade das características das salas",
            "Turno com inscrições superiores à capacidade das salas"]

def drop_unnecessary_columns(df, drop_col_list):
    """
    Removes columns from the dataframe that are present in the drop_col_list.
    """
    cleaned_df = df.drop(columns=drop_col_list)

    return cleaned_df


def rename_columns_from_portuguese_to_english(df):
    """
    Renames columns to english from portuguese and returns the corrected dataframe
    """

    portuguese_to_english_dict = {
        'Curso' : 'Course',
        'Unidade de execução': 'Name of the course',
        'Turno': 'ID',
        'Turma': 'Group ID',
        'Inscritos no turno (no 1º semestre é baseado em estimativas)': 'Number of enrolled students',
        'Dia da Semana': 'Day of the week',
        'Início': 'Start',
        'Fim': 'End',
        'Dia': 'Date',
        'Características da sala pedida para a aula': 'Requested characteristics of classroom',
        'Sala da aula': 'Room number',
        'Lotação': 'Capacity',
        'Características reais da sala': 'Assigned characteristics of classroom'
    }
    df = df.rename(columns=portuguese_to_english_dict)
    return df

def convert_dtypes(df):
    df = df.convert_dtypes()

    df["Date"] = pd.to_datetime(df["Date"])

    df["Start"] = pd.to_datetime(df["Start"])
    df["End"] = pd.to_datetime(df["End"])

    return df

def add_overfilled_column(df):
    """
    Adds an overfilled column that shows whether the given classroom is too small for the class or not.
    """
    df["Overfilled"] = df["Number of enrolled students"] > df["Capacity"]

    return df


def add_calculated_columns(df):
    df["Overall time in hours"] = df["End"] - df["Start"]
    df["Overall time in hours"] = df["Overall time in hours"] / pd.Timedelta('1 hour')
    df["Overall time in hours"].astype(float).sort_values(ascending=True)

    return df


def get_total_class_changes(df):
    """Calculates how many times a class has to change the classroom."""

    number_of_classes_per_class_and_day = df.groupby(['ID', 'Date']).size().reset_index(name='counts')
    number_of_classes_per_class_and_day["counts"] = number_of_classes_per_class_and_day["counts"] -1
    return number_of_classes_per_class_and_day["counts"].sum()


def get_total_overbook_classes(df):
    """Calculates the total occurence count of overbooked classes"""

    return df[df["Number of enrolled students"] > df["Capacity"]].shape[0]


def get_classes_per_days(df):
    """
    Returns how many times a classroom was used during the week for each day.
    Basically counts the occurence of each weekday in the given dataframe.
    """

    classes_per_days = df.groupby('Day of the week').size().reset_index(name='count').set_index('Day of the week')
    classes_per_days = classes_per_days.reindex(['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']).reset_index()

    return {
        'day_of_the_week': classes_per_days["Day of the week"].tolist(),
        'number_of_classes': classes_per_days["count"].tolist()
    }

def get_number_of_classrooms_free_for_the_whole_day(df, exclude_weekend=True):
    """
    Returns the total number of classrooms free for a whole day.
    exclude_weekend: tells whether we consider only monday-friday as schooldays or do we include the weekend as well
    """
    # We asssume that the number of classrooms will not change even if we use it for any other year
    total_classrooms = 131

    # In case we only consider monday - friday as school days
    if exclude_weekend:
        df = df[df["Date"].dt.weekday <= 4]

    schooldays = len(df["Date"].dropna().dt.date.unique().tolist())
    max_availability = schooldays * total_classrooms

    # Calculate how many different days a classroom is being used and sum these values together
    total_used_days = df[~df["Date"].isna()].groupby(by='Room number').agg({"Date":pd.Series.nunique})["Date"].sum()

    return max_availability - total_used_days


def get_total_number_of_classes_with_unspecified_date(df):
    """ Returns how many classes were not assigned to a date. """

    return df[df["Date"].isna()].shape[0]


def get_total_classrooms_unused_in_semester(df):
    """ Returns the number of total classrooms that were used exactly 0 times during the whole semester. """

    # Assume that the number of classroom is not going to change between the years
    total_classrooms = 131

    return total_classrooms - len(df["Room number"].dropna().unique())


def get_total_free_hours_with_minimum_limit(df, minimum_hours_limit=2):
    """ Returns a dictionary that shows the starting and ending time of classes for every classroom on every day."""

    df = df.sort_values(['Date', 'Start'], ascending=[False, True])

    df['Room number'] = df["Room number"].astype('category')
    df = df[["Date", "Room number", "Overall time in hours", "Start"]]

    total_days = len(df["Date"].unique())

    total_free_hours = 0
    for classroom in df["Room number"].unique():
        classroom_df = df[df["Room number"] == classroom]

        not_used_days = total_days - len(classroom_df["Date"].unique())
        total_free_hours += 15*not_used_days

        if classroom_df.shape[0] == 0:
            continue

        for date in classroom_df["Date"].unique():
            class_and_date_filtered_df = classroom_df[(classroom_df.loc[:,"Date"] == date) & (classroom_df.loc[:,"Room number"] == classroom)]

            hours = []
            start_times = (class_and_date_filtered_df["Start"].dt.hour + (class_and_date_filtered_df["Start"].dt.minute / 60.0)).to_list()
            timespans = class_and_date_filtered_df["Overall time in hours"].to_list()
            hours.append(8)

            for start, timespan in zip(start_times, timespans):
                    hours.extend([start, start+timespan])

            hours.append(23)

            hour_diff = [hours[i] - hours[i-1] for i in range(1,len(hours))]

            # Because every other element represents the length of the class we do not count them as free hours
            for item in hour_diff[::2]:
                if item >= minimum_hours_limit :
                    total_free_hours += item

    return total_free_hours

def get_number_of_classrooms_unused_per_day(df):
    """ Returns the number of classrooms that were not used for each day. """

    # Assume that the number of classroom is not going to change between the years
    total_classrooms = 131

    date_and_unused_room_dict = (total_classrooms - df.dropna().groupby(by='Date')["Room number"].nunique()).to_dict()

    dates = [t.strftime("%Y-%m-%d %H:%M:%S") for t in date_and_unused_room_dict.keys()]

    return {
        'dates':dates,
        'number_of_unused_classrooms': list(date_and_unused_room_dict.values())
    }

def get_number_of_classroom_and_sits(classroom_df):
    """ Returns a dictionary that stores the range of sittings as a key and the number of classes in that range. """
    bins = [0, 15, 30, 50, 100, 200, 500]
    labels = ['0-15','15-30','30-50','50-100','100-200', '200-500']

    classroom_df['binned_cap'] = pd.cut(classroom_df['Capacidade Normal'], bins=bins, labels=labels)

    return classroom_df['binned_cap'].value_counts().to_dict()

def get_uploaded_file_names():
    """ Returns a list of the file names that were uploaded to S3"""

    s3 = boto3.resource('s3')
    my_bucket = s3.Bucket('timetableuploadedfiles')

    files = []
    for my_bucket_object in my_bucket.objects.all():
        files.append(my_bucket_object.key)

    return json.dumps(files)

def clean_schedule_dataframe(df):
    df = drop_unnecessary_columns(df, get_unnecessary_columns())
    df = rename_columns_from_portuguese_to_english(df)
    df = convert_dtypes(df)
    df = add_calculated_columns(df)

    return df

def get_radarplot_metrics(schedule_filename):
    schedule_df = read_csv_as_dataframe_from_s3(schedule_filename)

    schedule_df = clean_schedule_dataframe(schedule_df)

    result_json = {
        'free_classrooms_for_min_2_hours': int(get_total_free_hours_with_minimum_limit(schedule_df)),
        'free_classrooms_for_one_day': int(get_number_of_classrooms_free_for_the_whole_day(schedule_df)),
        'overbooked_classes':  int(get_total_overbook_classes(schedule_df)),
        'required_room_change_for_students': int(get_total_class_changes(schedule_df)),
        'classes_with_unspecified_date': int(get_total_number_of_classes_with_unspecified_date(schedule_df)),
        'unused_classrooms': int(get_total_classrooms_unused_in_semester(schedule_df))
    }

    return result_json

def read_csv_as_dataframe_from_s3(filename):
    s3 = boto3.client('s3')
    obj = s3.get_object(Bucket="timetableuploadedfiles", Key=f"{filename}")
    df = pd.read_csv(obj['Body'])

    return df


def get_barplot_data(schedule_filename, classroom_filename):
    schedule_df = read_csv_as_dataframe_from_s3(schedule_filename)
    classroom_df = read_csv_as_dataframe_from_s3(classroom_filename)

    schedule_df = clean_schedule_dataframe(schedule_df)

    result_json = {
        'number_of_classrooms_and_sits': get_number_of_classroom_and_sits(classroom_df),
        'number_of_classrooms_unused_per_day': get_number_of_classrooms_unused_per_day(schedule_df),
        'number_of_classes_for_each_day': get_classes_per_days(schedule_df)
    }

    return result_json


def save_file_to_s3(filename):
    print(filename)
    bucket = 'timetableuploadedfiles'  # already created on S3
    s3 = boto3.client('s3')
   
    s3.upload_file(filename, bucket, filename)
    print(filename)
    return


if __name__ == "__main__":
    print(get_radarplot_metrics('schedule.csv', 'classrooms.csv'))
    print(get_barplot_data('schedule.csv', 'classrooms.csv'))

