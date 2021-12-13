import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns


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

    return classes_per_days["Day of the week"].tolist(), classes_per_days["count"].tolist()

def get_number_of_classrooms_free_for_the_whole_day(df, exclude_weekend=True):
    """
    Returns the total number of classrooms free for a whole day.
    exclude_weekend: tells whether we consider only monday-friday as schooldays or do we include the weekend as well
    """
    # We asssume that the number of classrooms will not change even if we use it for any other year
    TOTAL_CLASSROOMS = 131

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
    TOTAL_CLASSROOMS = 131

    return TOTAL_CLASSROOMS - len(df["Room number"].dropna().unique())


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




