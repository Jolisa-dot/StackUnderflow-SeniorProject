 Lumi - Mental Health Companion
---

### **👥 Team Members**

| Name | GitHub Handle | Contribution |
| ----- | ----- | ----- |
| Maya Swan | [@msmayaswan](https://github.com/msmayaswan) | Built Sentiment NLP model, designed wellness exercises, assisted with frontend development |
| Jolisa Fields | [@Jolisa-dot](https://github.com/Jolisa-dot) | Backend Integration, Developed core backend features including the journal system, daily check-in system, and the mood trend graph. Integrated MongoDB for data storage, built RESTful API routes|
| Dana Brunson | [@danabrunson](https://github.com/danabrunson) | Frontend design, frontend and backend feature integration |
| Laila Donaldson | [@lailacodes](https://github.com/lailacodes) | Designing UI utilizing Figma, assisting with the development of frontend design and integration |
| Nicolas Harris | [@NicolasHarris](https://github.com/NicolasHarris) | Backend |

---

## **🎯 Project Highlights**


* Lumi analyzes the environment and uses information provided by the user to supply resources/exercises suited to each individual. 

* Using NLP to interpret natural language for sentiment analysis.

* Implemented AR/3D/2D tools to optimize user experience through AR exercises.

* This project defines different techniques such as machine learning, UI, and backend development. 


---

## **👩🏽‍💻 Setup & Execution(Backend)**


Step 1: Clone the Repository
Open your terminal

Run:
git clone https://github.com/Jolisa-dot/StackUnderflow-SeniorProject.git
cd StackUnderflow-SeniorProject/Lumi/Code


Step 2: Install Backend Dependencies
Inside the Code/ folder, install all Node.js dependencies:

npm install


Step 3: Set Up Your Environment File
In the same Code/ folder, create a file named .env

Add the following content:

MONGO_URI=mongodb+srv://<your_username>:<your_password>@cluster.mongodb.net/lumi?retryWrites=true&w=majority
PORT=5000


Step 4: Start the Server
From the Code/ folder, start the backend server:

node server.js
This will run your Express server on http://localhost:5000.


Step 5: Test the Features
You can now access and test your backend:

If you're using HTML files like journal1-frontend.html or dailycheckin.html, open them in your browser

---

## **🏗️ Project Overview**


Lumi is a web application built using React.js and machine learning-powered sentiment analysis, designed to provide personalized emotional support.
It allows users to express how they feel through journaling and mood tracking, and receive AI-generated feedback via features such as:

*Personalized Daily Check Ins
*Journaling & Reflection Feature
*Mood Tracking
*Resource Hub with External Links
*AR/VR/2D based Coping Exercises 
*Sentiment NLP Text Analysis

Lumi promotes mindfulness and self-reflection by turning user input into actionable emotional insights, helping users build healthy mental wellness habits over time.

---

## **🧠 Model Development**

We implemented two pre-trained transformer-based NLP models using Hugging Face:

* distilbert-base-uncased-finetuned-sst-2-english for binary sentiment analysis (positive/negative)

* emotion-english-distilroberta-base for multi-label emotion classification (e.g., joy, sadness, fear, anger)

Training Setup:
The models were not trained or validated on custom data within our project scope. All journal and mood input was processed via real-time API calls on user-submitted text.
Evaluation of model performance was done based on a qualitative review of model output compared to the expected emotional tone from test journal entries.

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

* Involves improving the application by providing security and frontend and backend improvements.
* Improving the user experience can be achieved through UI updates and more functionality on the application.
* Much data is generated, providing a space to improve and add additional AI features.
* Future aspirations: overall enhancement and/or mobile deployment.

---

## **📄 References & Additional Resources**

*Currently, there are over 10,000 mental health and wellness applications available, each taking
different approaches to supporting users’ well-being. Many focus on mood tracking, mindfulness, or cognitive
behavioral therapy (CBT)-based techniques, but few provide a comprehensive, interactive, and adaptive
experience that combines AI-driven insights and habit-building features.

*According to the National Institute of Mental Health, approximately one in five adults in the U.S.
experience mental health challenges.

---
