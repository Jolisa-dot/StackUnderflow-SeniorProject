 Lumi - Mental Health Companion
---

### **👥 Team Members**

| Name | GitHub Handle | Contribution |
| ----- | ----- | ----- |
| Maya Swan | [@msmayaswan](https://github.com/msmayaswan) | Built CNN model, performed data augmentation |
| Jolisa Fields | @Jolisa-dot | Backend Integration, visualized dataset distributions, handled missing data|
| Dana Brunson | @danabrunson | Implemented Frontend, Frontend and Backend Integration |
| Laila Donaldson | @laila | figma, Frontend integration|
| Nicolas Harris | @nicolas | backend etc,etc,etc |

---

## **🎯 Project Highlights**


* Lumi uses an analyzed enviornment with information provided from the user to supply resources/exercise suited for each individual. 

* Using NLP to interpret natural language for a sentimental analysis.

* Implemented AR to optimize the users experience through AR exercises.

* This is a project that defines different techniques such as machine learning, UI and backend development. 


---

## **👩🏽‍💻 Setup & Execution**


* How to clone the repository  
    * Open your terminal 
    * Type the git Command git clone https://github.com/Jolisa-dot/StackUnderflow-SeniorProject.git
* How to install dependencies
    *
* How to set up the environment
* How to access the dataset(s)
* How to run the notebook or scripts

---

## **🏗️ Project Overview**


Lumi is a web application built using React.js and machine learning-powered sentiment analysis, designed to provide personalized emotional support.
It allows users to express how they feel through journaling and mood tracking, and receive AI-generated feedback via features such as:

*Daily emotional check-ins

*Smart journaling with real-time sentiment/emotion analysis

*Mood trend visualization

*Curated coping tools and resources

*Augmented Reality (AR)-based wellness activities (optional)

Lumi promotes mindfulness and self-reflection by turning user input into actionable emotional insights, helping users build healthy mental wellness habits over time.

---

## **🧠 Model Development**

We implemented two pre-trained transformer-based NLP models using Hugging Face:

*distilbert-base-uncased-finetuned-sst-2-english for binary sentiment analysis (positive/negative)

*emotion-english-distilroberta-base for multi-label emotion classification (e.g., joy, sadness, fear, anger)

Training Setup:
The models were not trained or validated on custom data within our project scope. All journal and mood input was processed via real-time API calls on user-submitted text.
Evaluation of model performance was done based on qualitative review of model output compared to expected emotional tone from test journal entries.

Evaluation Metric:
Since our project focuses on in-app emotional response and flagging rather than classification accuracy, evaluation was based on:

Subjective alignment between detected emotion and intended tone
Whether flagged harmful entries triggered the appropriate emergency resources

---

## **📈 Results & Key Findings**

Overall Model Performance:

Sentiment detection performed consistently well on casual, emotional, and reflective journal entries.
The emotion classification model provided multiple probable emotions with relative confidence scores, allowing nuanced reactions from the system.



## **🚀 Next Steps & Future Improvements**

* Involves improving the application by providing security and frontend backend improvements.
* Improving the user experience, can be achieved through UI updates and more functionality on the application.
* Much data is generated providing a space to improve and add additional AI features.
* Future aspirations: overall enhancement and/or mobile deployment.

---

## **📄 References & Additional Resources**

* Cite any relevant papers, articles, or tools used in your project

---
