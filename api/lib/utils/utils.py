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




