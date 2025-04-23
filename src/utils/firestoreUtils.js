// import { doc, setDoc, getDoc } from "firebase/firestore";
// import { db } from "../utils/firebase.js"; // adjust the path to your firebase.js

// export const saveWishlistToFirestore = async (uid, wishlist) => {
//   try {
//     console.log("Saving to Firestore:", uid, wishlist); // ✅ log before saving
//     await setDoc(doc(db, "wishlists", uid), { wishlist });
//     console.log("✅ Wishlist saved to Firestore");
//   } catch (error) {
//     console.error("❌ Error saving wishlist:", error);
//   }
// };

// export const getWishlistFromFirestore = async (uid) => {
//   try {
//     const docRef = doc(db, "wishlists", uid);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       console.log("✅ Data exists in Firestore");
//       return docSnap.data().wishlist;
//     } else {
//       console.warn("⚠️ No watchlist found in Firestore");
//       return [];
//     }
//   } catch (error) {
//     console.error("❌ Error fetching wishlist:", error);
//     return [];
//   }
// };

