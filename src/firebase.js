import firebase from "firebase";
import config from "../config";

const firebaseConfig = {
  apiKey: config.firebase.api_key,
  authDomain: config.firebase.auth_domain,
  projectId: config.firebase.project_id,
  storageBucket: config.firebase.storage_bucket,
  messagingSenderId: config.firebase.messaging_sender_id,
  appId: config.firebase.app_id,
};

const firebaseApp = firebase.initializeAPP(firebaseConfig);
