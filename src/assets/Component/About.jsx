import React from "react";
import { Utensils, Truck, Heart, Star } from "lucide-react";

const About = () => {
    return (
        <section className="bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 py-16 px-6 md:px-20 text-gray-800">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-orange-600 mb-6">
                    🍔 About Us – SmartDine
                </h2>
                <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-10">
                    Welcome to <span className="font-semibold text-orange-500">SmartDine</span>!
                    Here, every meal is not just food — it's an <span className="italic text-red-500">experience</span>.
                    We believe that even one meal can be the happiest moment of your day.
                </p>

                <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
                        <h3 className="text-2xl font-bold flex items-center gap-2 text-orange-600 mb-3">
                            <Utensils className="text-orange-500" /> Fresh & Tasty Food
                        </h3>
                        <p>
                            🌿 Each of our dishes is crafted with love, honesty, and the freshest ingredients.
                            From hot biryani to crispy fried chicken — every bite feels like home with restaurant-style perfection!
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
                        <h3 className="text-2xl font-bold flex items-center gap-2 text-orange-600 mb-3">
                            <Truck className="text-orange-500" /> Fast Home Delivery
                        </h3>
                        <p>
                            🚀 Order your favorite food from the comfort of your home — we’ll deliver it right to your door in no time!
                            Our delivery heroes are always ready to bring you happiness with every meal. 😋
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
                        <h3 className="text-2xl font-bold flex items-center gap-2 text-orange-600 mb-3">
                            <Heart className="text-orange-500" /> Dine-in Experience
                        </h3>
                        <p>
                            🏠 Enjoy a cozy atmosphere, soothing music, and warm hospitality —
                            making your every visit memorable and full of joy. 💖
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
                        <h3 className="text-2xl font-bold flex items-center gap-2 text-orange-600 mb-3">
                            <Star className="text-orange-500" /> Our Promise
                        </h3>
                        <ul className="list-disc list-inside">
                            <li>💫 Always fresh and high-quality food</li>
                            <li>🚚 Fast and reliable delivery service</li>
                            <li>🎉 Exclusive offers and discounts</li>
                            <li>❤️ Customer satisfaction is our top priority</li>
                        </ul>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition md:col-span-2">
                        <h3 className="text-2xl font-bold flex items-center gap-2 text-orange-600 mb-3">
                            📞 Contact Us
                        </h3>
                        <p className="text-gray-700">
                            Have any questions or feedback? We'd love to hear from you! 💌
                        </p>
                        <ul className="mt-3 space-y-2 text-gray-700">
                            <li>📍 Location: Naonaon Polytechnic Institute, Dhaka, Bangladesh</li>
                            <li>📞 Phone: +880 1234-567890</li>
                            <li>✉️ Email: support@smartdine.com</li>
                            <div className="flex gap-10 pt-5">
                                <a href="https://x.com/home" target='_blank'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        className="fill-current">
                                        <path
                                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                                    </svg>
                                </a>
                                <a href="https://www.youtube.com/" target='_blank'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        className="fill-current">
                                        <path
                                            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                                    </svg>
                                </a>
                                <a href="https://www.facebook.com/" target='_blank'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        className="fill-current">
                                        <path
                                            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                                    </svg>
                                </a>
                            </div>
                        </ul>

                    </div>
                </div>

                <p className="text-xl mt-10 text-gray-700 font-medium">
                    Let’s enjoy <span className="text-orange-500 font-bold">“Taste with Emotion”</span> together 🍴
                    Because every plate tells a story — and every story is made with love! 🌈
                </p>
            </div>
        </section>
    );
};

export default About;






// import React from "react";
// import { Utensils, Truck, Heart, Star } from "lucide-react";

// const About = () => {
//     return (
//         <section className="bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 py-16 px-6 md:px-20 text-gray-800">
//             <div className="max-w-5xl mx-auto text-center">
//                 <h2 className="text-4xl md:text-5xl font-bold text-orange-600 mb-6">
//                     🍔 About Us – স্বাদের গল্প, ভালোবাসার ছোঁয়ায়!
//                 </h2>
//                 <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-10">
//                     স্বাগতম <span className="font-semibold text-orange-500">[Restaurant Name]</span>-এ!
//                     এখানে প্রতিটি খাবার শুধু খাবার নয়, এটি একটি <span className="italic text-red-500">experience</span>!
//                     আমরা বিশ্বাস করি, একবেলা খাওয়াও হতে পারে দিনের সবচেয়ে আনন্দের মুহূর্ত।
//                 </p>

//                 <div className="grid md:grid-cols-2 gap-8 text-left">
//                     <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
//                         <h3 className="text-2xl font-bold flex items-center gap-2 text-orange-600 mb-3">
//                             <Utensils className="text-orange-500" /> Fresh & Tasty Food
//                         </h3>
//                         <p>
//                             🌿 আমাদের প্রতিটি ডিশ তৈরি হয় ভালোবাসা, সততা আর তাজা উপকরণে।
//                             গরম গরম বিরিয়ানি থেকে শুরু করে মচমচে ফ্রাইড চিকেন — প্রতিটি কামড়ে পাবেন ঘরের মতো স্বাদ!
//                         </p>
//                     </div>

//                     <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
//                         <h3 className="text-2xl font-bold flex items-center gap-2 text-orange-600 mb-3">
//                             <Truck className="text-orange-500" /> Fast Home Delivery
//                         </h3>
//                         <p>
//                             🚀 ঘরে বসেই পছন্দের খাবার অর্ডার দিন — আমরা পৌঁছে দেবো মুহূর্তেই!
//                             আমাদের ডেলিভারি টিম সর্বদা প্রস্তুত আপনার হাসি পৌঁছে দিতে। 😋
//                         </p>
//                     </div>

//                     <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
//                         <h3 className="text-2xl font-bold flex items-center gap-2 text-orange-600 mb-3">
//                             <Heart className="text-orange-500" /> Dine-in Experience
//                         </h3>
//                         <p>
//                             🏠 আরামদায়ক পরিবেশ, মনোমুগ্ধকর সঙ্গীত আর হাসিমুখে সার্ভিস —
//                             আপনার সময় হবে আনন্দে ভরা ও মন ভোলানো। 💖
//                         </p>
//                     </div>

//                     <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
//                         <h3 className="text-2xl font-bold flex items-center gap-2 text-orange-600 mb-3">
//                             <Star className="text-orange-500" /> Our Promise
//                         </h3>
//                         <ul className="list-disc list-inside">
//                             <li>💫 সর্বদা তাজা ও মানসম্মত খাবার</li>
//                             <li>🚚 দ্রুত ডেলিভারি সার্ভিস</li>
//                             <li>🎉 বিশেষ অফার ও ছাড়</li>
//                             <li>❤️ গ্রাহক সন্তুষ্টিই আমাদের প্রথম অগ্রাধিকার</li>
//                         </ul>
//                     </div>
//                 </div>

//                 <p className="text-xl mt-10 text-gray-700 font-medium">
//                     চলুন, একসাথে উপভোগ করি
//                     <span className="text-orange-500 font-bold"> “Taste with Emotion” </span> 🍴
//                     কারণ প্রতিটি প্লেটে আছে গল্প, আর প্রতিটি গল্পে আছে ভালোবাসা! 🌈
//                 </p>
//             </div>
//         </section>
//     );
// };

// export default About;
