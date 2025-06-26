import requests
import streamlit as st
import pandas as pd # Import pandas to create DataFrames


def get_dynamodb_response():
    try:
        response=requests.get("http://127.0.0.1:8003")
        return response.json()
    except Exception as e:
        st.error(f"Error fetching data from API: {e}")
        return None

def welcome_screen_with_custom_background_and_table():
    """
    Displays the welcome screen with a custom background color, centered top content,
    and a full-width table at the bottom.
    """
    # --- CHANGE 1: Set page layout to "wide" ---
    # This is the key change that allows any element to become full-width.
    st.set_page_config(
        page_title="Contact Center Application",
        page_icon="",
        layout="wide", # Changed from "centered" to "wide"
        initial_sidebar_state="auto"
    )

    # --- Custom CSS for Background Color (No changes here) ---
    background_color = "#FFFFFF" # Lemon Chiffon
    st.markdown(
        f"""
        <style>
        .stApp {{
            background-color: {background_color};
            background-attachment: fixed;
            background-size: cover;
        }}
        </style>
        """,
        unsafe_allow_html=True
    )

    # --- CHANGE 2: Create a centered container for the top content ---
    # We use columns to create empty space on the left and right, effectively
    # centering the content in the middle column. Adjust the ratio [1, 2, 1] as needed.
    _left, mid_col, _right = st.columns([1, 3, 1])

    with mid_col:
        # --- All your original top content goes inside this middle column ---

        st.markdown(
            "<h1 style='text-align: center; color: #2E86C1;'>Welcome to Your Contact Center</h1>",
            unsafe_allow_html=True
        )
        st.markdown(
            "<h3 style='text-align: center; color: #2E86C1;'>+1 7894561230</h3>",
            unsafe_allow_html=True
        )

        st.markdown(
            """
            <div style='text-align: center; font-size: 1.1em; color: #333333; margin-top: -10px;'>
            Your centralized hub for managing customer interactions and optimizing team performance.
            </div>
            """,
            unsafe_allow_html=True
        )
        st.write("") # Acts as a spacer

        st.markdown("---")

        st.markdown(
            """
            <h3 style='text-align: center; color: #4A4A4A;'>Start Exploring Your Data</h3>
            <div style='text-align: center; font-size: 1.0em; color: #555555;'>
            Navigate through the comprehensive modules to gain insights and manage operations efficiently.
            </div>
            """,
            unsafe_allow_html=True
        )
        st.write("")

        # These columns are now nested inside our main centering column, which is fine.
        col1, col2, col3 = st.columns([1, 0.05, 1])

        with col1:
            st.subheader("Customer Insights")
            st.write("Understand customer journeys, sentiment, and feedback.")

        with col3:
            st.subheader("Agent Performance")
            st.write("Monitor productivity, quality, and training needs.")

        st.markdown("---")

    # --- The FULL-WIDTH TABLE (now outside the centering columns) ---
    st.markdown("<br>", unsafe_allow_html=True)

    st.subheader("Quick Metrics Snapshot")
    
    response=get_dynamodb_response()
    print(response)

    # --- NO CHANGE NEEDED HERE ---
    # Because the page layout is "wide", use_container_width=True will now
    # make the dataframe span the full available width.
    st.dataframe(response.get("summary_data",[]), hide_index=True, use_container_width=True)

    st.markdown("<br><br>", unsafe_allow_html=True)

# To run this specific welcome screen:
if __name__ == "__main__":
    welcome_screen_with_custom_background_and_table()