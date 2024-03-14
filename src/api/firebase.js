import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, get, set, remove } from "firebase/database";
import { v4 as uuid } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

const login = () => {
  signInWithPopup(auth, provider).catch(console.error);
};

const logout = () => {
  signOut(auth).catch(console.error);
};

const onUserStateChange = async (callback) => {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
};

const adminUser = async (user) => {
  return get(ref(database, "admins")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
    });
};

const addNewProduct = async (data) => {
  const { product, url } = data;
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: product.price && parseInt(product.price),
    image: url,
    options:
      product.options && product.options.includes(",")
        ? product.options.split(",")
        : product.options,
  });
};

const getProducts = async () => {
  return get(ref(database, "products")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    });
};

const addOrUpdateCart = async (data) => {
  const { userId, product } = data;
  console.log(userId, product);
  return set(ref(database, `cart_${userId}/${product.id}`), product);
};

const getCart = async (uid) => {
  return get(ref(database, `cart_${uid}`)) //
    .then((snapshot) => {
      const items = snapshot.val() || {};
      return Object.values(items);
    });
};

const removeFromCart = async (data) => {
  const { userId, productId } = data;
  console.log(userId, productId);
  return remove(ref(database, `cart_${userId}/${productId}`));
};

export {
  login,
  logout,
  onUserStateChange,
  addNewProduct,
  getProducts,
  addOrUpdateCart,
  getCart,
  removeFromCart,
};
