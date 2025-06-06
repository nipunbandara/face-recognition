## Face Recognition Application

Welcome! This application leverages a prebuilt face recognition model with predefined class names for quick and easy deployment.

### 🚀 Features
- **Instant Recognition:** Uses a ready-to-go model for immediate results.
- **Easy Integration:** No complex setup required.

### 🔧 Custom Model Training

Want to recognize different faces or classes?  
You can train your own model using our [Model Creation Tool](https://github.com/nipunbandara/face-recognition-model.git).  
This allows you to define custom class names and tailor the recognition system to your needs.

### 🔄 Replacing the Default Model

To use your own trained model, simply replace the existing model file in the `public` directory of this project.  
Make sure your new model follows the required format and naming conventions as described in the [Model Creation Tool documentation](https://github.com/nipunbandara/face-recognition-model.git).

After replacing the model, restart the application to load your custom model for recognition.

### 🏷️ Customizing Class Names

When capturing datasets live, you can assign class names according to your preference—simply enter the desired name when prompted during the capture process.  
If you are using a dataset folder, the folder name will automatically be used as the person's class name.  
This ensures that your model recognizes faces based on the names you provide, making the system flexible and easy to personalize.

### 📝 Updating Class Names in Code

To customize the recognized class names in this application, update the `classNames` array in this code:

```js
const classNames = ["Max", "Jack", "James"];
```

Replace `"Person1"`, `"Person2"`, and `"Person3"` with your desired names.  
This ensures the application displays the correct labels when recognizing faces.
### 🌟 Planned Updates

- **Automated Model Training:**  
    Soon, you'll be able to train models with custom class names directly from the client application—no separate tools or manual steps required!

Stay tuned for more updates and improvements!

---