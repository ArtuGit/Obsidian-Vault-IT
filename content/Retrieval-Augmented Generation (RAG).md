## The significance of context in LLMs

In the world of Large Language Models (LLMs), the context is crucial for producing correct and useful answers. To improve how these models work, there are two main approaches: increasing the size of the context window and using retrieval systems. Large context windows provide LLMs with extensive data for each question, which could help them give better answers. However, retrieval systems are used to make the best use of this large amount of data by selecting only the most important information.

### Context window size in LLMs

When the context window is expanded, LLMs can look at more data at once. However, this method has some big drawbacks. It can flood the models with information, which can make them less effective, cause more mistakes, and increase the amount of computing power needed. Also, managing bigger contexts uses more energy and requires more resources, which can greatly increase the costs of running these systems.

### Efficiency of retrieval systems

Retrieval systems are crucial because they carefully pick out the most important information from large amounts of data, helping LLMs work more effectively. These systems have been improved over many years to make LLMs more accurate and quick, while using fewer resources. By processing only the necessary data, retrieval systems help save computational power and reduce costs.

Studies show that LLMs do not work well with very large, unfiltered datasets. They have trouble finding and using the important information when there is too much data. The evidence clearly shows that as the context size gets bigger, the accuracy of the models goes down, highlighting the problems with using large context windows in real-world situations.

### Advantages of Retrieval-Augmented Generation (RAG)

Retrieval-Augmented Generation (RAG) is a way to make AI systems smarter and more reliable by combining two steps: retrieving relevant information and using it to create answers. This helps AI respond to questions using up-to-date knowledge instead of relying only on pre-learned data. Let’s break it down step by step.

**Combining two key techniques:**

- **Text generation:** This is the core ability of many AI systems, where they use learned patterns from a vast amount of text to generate new text. These systems, known as language models, can answer questions, write essays, or chat casually based on the data they were trained on.
- **Information Retrieval:** Before forming a response, the RAG system performs a targeted search for information that is specifically relevant to the query it needs to answer. This is similar to how you might use a search engine to gather facts before writing a report. The AI uses databases, websites, or other digital repositories to find accurate and up-to-date information.

**How RAG enhances AI responses:**

- When an AI receives a question or a prompt, it first uses its retrieval function to find external information that matches or relates to the query.
- This information is then combined with the AI’s own knowledge base, which enriches the context the AI has to work with.
- With this enriched context, the AI generates a response that not only reflects its initial training but is also augmented by the specific, relevant information it retrieved.

### Why is RAG important?

RAG is particularly useful because it overcomes some of the big challenges faced by traditional AI language models, such as:

📅 **Staying current:** Traditional AI models can become outdated because they only know what they were last trained on. RAG allows AIs to access the latest information, ensuring they remain useful over time.  
✅ **Improving accuracy:** By using up-to-date and relevant external information, RAG helps AIs avoid making mistakes or providing incorrect answers.  
🤝 **Building trust:** When AIs can provide answers that are not only correct but also based on the latest data, people can trust their responses more, which is crucial for applications in fields like healthcare, finance, and customer service.

### Example to illustrate:

Imagine you're using an AI health coach to get personalized advice on managing diabetes. You've previously entered detailed information about your diet preferences, physical activity levels, and current medications into a system that stores this data in a database like Pinecone.

Here's how RAG works in this scenario:

- **Context retrieval:** When you ask the AI, "What's the best breakfast for my condition?", the AI doesn't just use generic diet information. Instead, it first retrieves your specific health profile from Pinecone, including details like your preference for low-sugar foods and any allergic reactions to common ingredients.
- **Information integration:** With your personal health data retrieved, the AI then uses RAG to search for the latest nutritional research and guidelines specific to diabetes management. It finds a recently published study suggesting that a high-protein, low-carbohydrate breakfast can help control blood sugar levels.
- **Personalized advice generation:** Combining the insights from the study with your personal health profile, the AI crafts a response tailored just for you. It might say, "For managing your diabetes, a good breakfast could be an omelette made with one whole egg and two egg whites, spinach, mushrooms, and no cheese. This meal is high in protein, low in carbohydrates, and aligns with your dietary preferences."

## Breaking down RAG architecture

![img alt](https://ebook.learn.epam.com/ai-assistant/assets/images/rag-arch-173f32ff3ffd60f93aa5b292329edba9.png)

---

### Step 1. Data collection (preparation)

**Why is this step needed?**

Data collection is the foundation of RAG architecture. The system needs access to a knowledge base that it can use to find relevant information. Without this step, the AI would rely only on pre-trained knowledge, which can be outdated or incomplete. By preparing a custom dataset, we make the AI capable of answering questions specific to a domain, like company policies, technical documentation, or scientific research.

**What sources can be used?**

The data sources depend on the purpose of the RAG system. Here are common examples:

📄 **Documents:** PDFs, Word files, and other text-based files. These are often the main source of structured and detailed information.  
🌐 **Web pages:** Articles, blogs, or FAQs from websites. These provide up-to-date and domain-specific knowledge.  
🗄️ **Databases:** Structured information from relational or NoSQL databases. Databases offer highly organized and queryable data.  
🔗 **APIs:** Dynamic data fetched from online services, like weather updates or stock market data. APIs ensure that the system has access to real-time information.  
📊 **Logs or reports:** Historical data such as system logs or analytics reports. These are useful for answering questions based on past trends or events.  
✉️ **Emails or chats:** Customer service interactions or team discussions. These help the system learn from real-world conversations and queries.

The more diverse and rich the sources, the better the system can respond to varied questions. Each source contributes unique strengths, ensuring the RAG system is well-prepared for different types of user inquiries.

**Techniques used on this phase:**

|**Technique**|**Description**|**Steps/Details**|
|---|---|---|
|**Data Cleaning**|Removes irrelevant or redundant information, ensuring focus on meaningful content.|Remove duplicates and irrelevant sections => Handle formatting inconsistencies (e.g., plain text from PDFs) => Resolve encoding issues (like non-standard characters).|
|**Preprocessing**|Prepares data for embedding generation by structuring it effectively.|Split documents into smaller chunks (e.g., paragraphs or sections) for better search granularity => Tokenize text into words or phrases => Handle special characters or symbols.|
|**Embedding Generation**|Converts cleaned and preprocessed text into numerical vectors representing its meaning.|Tools include models like OpenAI’s Ada, Sentence-BERT, or Hugging Face transformers.|
|**Metadata Tagging**|Adds metadata to each chunk to improve retrieval speed and accuracy.|Source (e.g., document title or URL) => Date of publication => Tags (e.g., category, topic, or relevance score).|

**What do we have at the end?**

The result of this step is a collection of embeddings and their corresponding metadata, ready to be stored in a vector database.

---

### Step 2. Storing the knowledge

Once the data has been collected and transformed into embeddings, the next step is to organize and store it efficiently. This is where a vector database comes in. Think of it as a library, but instead of storing books, it stores numerical representations (embeddings) of your data for quick and meaningful searches.

**Why is this step needed?**

Without a proper storage system, it would be slow and inefficient to search through large datasets. A vector database allows the system to quickly find information based on meaning, not just keywords. It ensures:

⚡ **Speed:** Fast searches even with millions of embeddings.  
📈 **Scalability:** Handles growing datasets as more information is added.  
🎯 **Accuracy:** Retrieves relevant data even when user queries use different words or phrasing.

These features make the vector database a critical part of the RAG architecture, ensuring users get timely and accurate responses.

**How is knowledge stored?**

1. **Storing embeddings** Each chunk of data from the previous step is stored as an embedding (a vector). Alongside these embeddings, metadata is stored to provide additional context.
    
2. **Indexing** The database indexes embeddings using efficient algorithms (e.g., HNSW or ANNOY) to enable similarity-based searches. This indexing ensures that the system can quickly find the closest matches for any query embedding.
    

**How is the data used?**

The embeddings and metadata in the vector database are ready to be searched. When a query is submitted, the database compares its embedding to those stored and returns the most relevant matches.

---

### Step 3. Finding the right information (Retrieval)

Now that the embeddings and metadata are stored in a vector database, the next step is retrieval. This is where the system finds the most relevant pieces of information to answer a user’s query. It compares the user’s query to all stored embeddings and returns the ones that are the most similar.

**Why is this step needed?**

The retrieval step ensures the system can find the most relevant information for a given query. Without retrieval, the generative AI model would not have the specific, up-to-date, or domain-specific context needed to provide accurate answers. Retrieval adds precision to the system by narrowing down the data to what is actually useful.

**How does it work?**

1. **Query embedding**  
    The user’s question or prompt is converted into an embedding (just like the stored data was in Step 1).  
    Example: A query like “How do I reset my password?” becomes a vector that captures the meaning of the question.
    
2. **Similarity search**  
    The system searches the vector database for embeddings that are closest to the query embedding.  
    How is similarity measured? Using distance metrics like cosine similarity or Euclidean distance, which measure how close two embeddings are in the vector space.
    
3. **Top-k results**  
    The system retrieves the top-k most relevant results (e.g., the top 5 or 10 matching embeddings).  
    Example: For the query “How do I reset my password?” the system might return: “To reset your password, click the ‘Forgot Password’ link.” “Password reset instructions will be sent to your email.”
    

**Why does retrieval focus on similarity?**

Unlike keyword searches that look for exact matches, similarity-based retrieval finds content that means the same thing, even if the words are different. This makes the system much more flexible and user-friendly.

---

### Step 4. Creating the answer (Generation)

After retrieving the most relevant pieces of information, the next step is to use this data to create a meaningful and user-friendly answer. This is where the generative AI model (like GPT or T5) comes into play. It combines the retrieved information with its own knowledge to craft a coherent and complete response.

**Why is this step needed?**

The retrieved information alone might not be enough for a user-friendly response. For example, it may consist of fragmented sentences or incomplete data. The generative model synthesizes this information into a clear, natural-sounding reply.

**How does it work?**

1. **Input formatting**  
    The retrieved data and the user’s original query are combined into a single prompt that the generative model can process.  
    Example prompt:  
    Query: “How do I reset my password?”  
    Retrieved context:  
    “Password reset instructions are emailed.”  
    “Go to ‘Settings’ and click ‘Forgot Password.’”
    
2. **Language generation**  
    The generative model takes the prompt and retrieved data to generate a complete answer.  
    The model uses its internal knowledge (pre-trained data) along with the retrieved information to ensure accuracy and coherence.
    
3. **Post-Processing**  
    The response is checked for grammar, clarity, and relevance. Some systems may have additional logic to refine the output before showing it to the user.
    

**Benefits of generation step**

📜 Clarity: Turns fragmented information into a polished, user-friendly response.  
🎯 Relevance: Combines retrieved context with AI’s pre-trained knowledge for accurate answers.  
🌐 Adaptability: Can generate responses in different formats, such as paragraphs, bullet points, or step-by-step instructions.

---

### Step 5. Feedback and improvement

The final step in the RAG architecture is feedback and improvement. This ensures that the system gets better over time by learning from user interactions. Feedback helps the system refine its retrieval and generation processes, making responses more accurate, relevant, and user-friendly.

**Why is this step needed?**

AI systems are not perfect - they might retrieve less relevant information or generate unclear answers. By analyzing user feedback, the system can identify weaknesses and improve:

🎯 Accuracy: Fix common mistakes in retrieval or generation.  
📌 Relevance: Prioritize data sources or embeddings that users find most useful.  
😊 User Experience: Adjust the tone or style of responses to match user expectations.  
These improvements make the system more reliable, user-friendly, and effective with each interaction.

## Conclusion

Retrieval-Augmented Generation (RAG) is a transformative approach to enhancing AI systems. By combining retrieval and generation, RAG overcomes the limitations of traditional LLMs, such as outdated knowledge and inefficiencies in managing large datasets Each step in the architecture - data collection, storage, retrieval, generation, and feedback - ensures the system delivers relevant, context-aware, and up-to-date responses. This makes RAG highly effective for real-world applications where accuracy, adaptability, and trust are essential.