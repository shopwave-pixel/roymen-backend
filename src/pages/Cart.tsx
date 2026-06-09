import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, ArrowLeft, Trash2, CheckCircle, Gift, CreditCard, ShieldCheck } from 'lucide-react';

export const districtAreas: Record<string, { en: string; bn: string }[]> = {
  "Bagerhat": [
    { en: "Bagerhat Sadar", bn: "বাগেরহাট সদর" },
    { en: "Mongla Port", bn: "মংলা বন্দর" },
    { en: "Morrelganj", bn: "মোড়েলগঞ্জ" },
    { en: "Fakirhat", bn: "ফকিরহাট" },
    { en: "Rampal", bn: "রামপাল" }
  ],
  "Bandarban": [
    { en: "Bandarban Sadar", bn: "বান্দরবান সদর" },
    { en: "Ruma Upazila", bn: "রুমা উপজেলা" },
    { en: "Thanchi Upazila", bn: "থানচি উপজেলা" },
    { en: "Alikadam", bn: "আলীকদম" },
    { en: "Lama Town", bn: "লামা পৌরসভা" }
  ],
  "Barguna": [
    { en: "Barguna Sadar", bn: "বরগুনা সদর" },
    { en: "Amtali", bn: "আমতলী" },
    { en: "Patharghata", bn: "পাথরঘাটা" },
    { en: "Betagi", bn: "বেতাগী" },
    { en: "Taltali Zone", bn: "তালতলী জোন" }
  ],
  "Barisal": [
    { en: "Barisal Sadar", bn: "বরিশাল সদর" },
    { en: "Rupatali", bn: "রূপাতলী" },
    { en: "Nathullabad", bn: "নথুল্লাবাদ" },
    { en: "Bakerganj", bn: "বাকেরগঞ্জ" },
    { en: "Gournadi", bn: "গৌরনদী" },
    { en: "Wazirpur", bn: "উজিরপুর" }
  ],
  "Bhola": [
    { en: "Bhola Sadar", bn: "ভোলা সদর" },
    { en: "Char Fasson", bn: "চরফ্যাশন" },
    { en: "Lalmohan", bn: "লালমোহন" },
    { en: "Tazumuddin", bn: "তজুমoverride" },
    { en: "Burhanuddin", bn: "বোরহানউদ্দিন" }
  ],
  "Bogra": [
    { en: "Bogra Sadar", bn: "বগুড়া সদর" },
    { en: "Sherpur Town", bn: "শেরপুর পৌরসভা" },
    { en: "Shajahanpur Corridor", bn: "শাহজাহানপুর করডোর" },
    { en: "Dhunat", bn: "ধুনট" },
    { en: "Shibganj Bogra", bn: "শিবগঞ্জ বগুড়া" }
  ],
  "Brahmanbaria": [
    { en: "Brahmanbaria Sadar", bn: "ব্রাহ্মণবাড়িয়া সদর" },
    { en: "Ashuganj", bn: "আশুগঞ্জ" },
    { en: "Bancharampur", bn: "বাঞ্ছারামপুর" },
    { en: "Sarail", bn: "সরাইল" },
    { en: "Kasba", bn: "কসবা" }
  ],
  "Chandpur": [
    { en: "Chandpur Sadar", bn: "চাঁদপুর সদর" },
    { en: "Hajiganj", bn: "হাজীগঞ্জ" },
    { en: "Faridganj", bn: "ফরিদগঞ্জ" },
    { en: "Kachua", bn: "কচুয়া" },
    { en: "Matlab South", bn: "মতলব দক্ষিণ" }
  ],
  "Chittagong": [
    { en: "Panchlaish", bn: "পাঁচলাইশ" },
    { en: "Halishahar", bn: "হালিশহর" },
    { en: "Khulshi", bn: "খুলশী" },
    { en: "Double Mooring", bn: "ডবলমুরিং" },
    { en: "Kotwali", bn: "কোতোয়ালী" },
    { en: "Agrabad", bn: "আগ্রাবাদ" },
    { en: "Nasirabad", bn: "নাসিরাবাদ" }
  ],
  "Chuadanga": [
    { en: "Chuadanga Sadar", bn: "চুয়াডাঙ্গা সদর" },
    { en: "Alamdanga", bn: "আলমডাঙ্গা" },
    { en: "Jibannagar", bn: "জীবননগর" },
    { en: "Damurhuda", bn: "দামুড়হুদা" }
  ],
  "Comilla": [
    { en: "Kandirpar", bn: "কান্দিরপাড়" },
    { en: "Kotbari", bn: "কোটবাড়ী" },
    { en: "Sadar Dakshin", bn: "সদর দক্ষিণ" },
    { en: "Chawkbazar", bn: "চকবাজার" },
    { en: "Laksam", bn: "লাকসাম" }
  ],
  "Cox's Bazar": [
    { en: "Kolatoli Beach Area", bn: "কলাতলী বিচ এরিয়া" },
    { en: "Sadar Town", bn: "সদর পৌরসভা" },
    { en: "Inani Node", bn: "ইনানী সৈকত" },
    { en: "Teknaf Lane", bn: "টেকনাফ জোন" },
    { en: "Ukhiya Center", bn: "উখিয়া সেন্টার" }
  ],
  "Dhaka": [
    { en: "Uttara", bn: "উত্তরা" },
    { en: "Mirpur", bn: "মিরপুর" },
    { en: "Gulshan", bn: "গুলশান" },
    { en: "Banani", bn: "বনানী" },
    { en: "Dhanmondi", bn: "ধানমন্ডি" },
    { en: "Mohammadpur", bn: "মোহাম্মদপুর" },
    { en: "Badda", bn: "বাড্ডা" },
    { en: "Motijheel", bn: "মতিঝিল" },
    { en: "Khilgaon", bn: "খিলগাঁও" },
    { en: "Old Dhaka", bn: "পুরান ঢাকা" },
    { en: "Cantonment", bn: "ক্যান্টনমেন্ট" },
    { en: "Tejgaon", bn: "তেজগাঁও" },
    { en: "Rampura", bn: "রামপুরা" }
  ],
  "Dinajpur": [
    { en: "Dinajpur Sadar", bn: "দিনাজপুর সদর" },
    { en: "Hili Land Port", bn: "হিলি স্থলবন্দর" },
    { en: "Birganj", bn: "বীরগঞ্জ" },
    { en: "Parbatipur", bn: "পার্বতীপুর" },
    { en: "Phulbari", bn: "ফুলবাড়ী" }
  ],
  "Faridpur": [
    { en: "Faridpur Sadar", bn: "ফরিদপুর সদর" },
    { en: "Bhanga", bn: "ভাঙ্গা" },
    { en: "Madhukhali", bn: "মধুখালী" },
    { en: "Sadarpur Upazila", bn: "সদরপুর উপজেলা" },
    { en: "Charbhadrasan", bn: "চরভদ্রাসন" }
  ],
  "Feni": [
    { en: "Feni Sadar", bn: "ফেনী সদর" },
    { en: "Daganbhuiyan", bn: "দাগনভূঞা" },
    { en: "Sonagazi", bn: "সোনাগাজী" },
    { en: "Chhagalnaiya", bn: "ছাগলনাইয়া" },
    { en: "Parshuram", bn: "পরশুরাম" }
  ],
  "Gaibandha": [
    { en: "Gaibandha Sadar", bn: "গাইবান্ধা সদর" },
    { en: "Gobindaganj", bn: "গোবিন্দগঞ্জ" },
    { en: "Palashbari", bn: "পলাশবাড়ী" },
    { en: "Sundarganj", bn: "সুন্দরগঞ্জ" },
    { en: "Saadullapur", bn: "সাদুল্লাপুর" }
  ],
  "Gazipur": [
    { en: "Chowrasta", bn: "চৌরাস্তা" },
    { en: "Board Bazar", bn: "বোর্ড বাজার" },
    { en: "Konabari", bn: "কোনাবাড়ী" },
    { en: "Tonghi Ward", bn: "টঙ্গী ওয়াড" },
    { en: "Kaliakair", bn: "কালিয়াকৈর" }
  ],
  "Gopalganj": [
    { en: "Gopalganj Sadar", bn: "গোপালগঞ্জ সদর" },
    { en: "Tungipara", bn: "টুঙ্গিপাড়া" },
    { en: "Kotalipara", bn: "কোটালীপাড়া" },
    { en: "Muksudpur", bn: "মুকসুদপুর" },
    { en: "Kashiani", bn: "কাশিয়ানী" }
  ],
  "Habiganj": [
    { en: "Habiganj Sadar", bn: "হবিগঞ্জ সদর" },
    { en: "Madhabpur", bn: "মাধবপুর" },
    { en: "Nabiganj", bn: "নবীগঞ্জ" },
    { en: "Bahubal", bn: "বাহুবল" },
    { en: "Chunarughat", bn: "চুনারুঘাট" }
  ],
  "Jamalpur": [
    { en: "Jamalpur Sadar", bn: "জামালপুর সদর" },
    { en: "Dewanganj", bn: "দেওয়ানগঞ্জ" },
    { en: "Sarishabari", bn: "সরিষাবাড়ী" },
    { en: "Baksiganj", bn: "বকশীগঞ্জ" },
    { en: "Melandaha", bn: "মেলান্দহ" }
  ],
  "Jessore": [
    { en: "Kotwali Sadar", bn: "কোতোয়ালী সদর" },
    { en: "Jessore Cantonment", bn: "যশোর সেনানিবাস" },
    { en: "Noapara Industrial", bn: "নওয়াপাড়া শিল্প এলাকা" },
    { en: "Benapole Border", bn: "বেনাপোল সীমান্ত জোন" },
    { en: "Jhikargachha", bn: "ঝিকরগাছা" }
  ],
  "Jhalokati": [
    { en: "Jhalokati Sadar", bn: "ঝালকাঠি সদর" },
    { en: "Nalchity", bn: "নলছিটি" },
    { en: "Rajapur Area", bn: "রাজাপুর এরিয়া" },
    { en: "Kathalia", bn: "কাঠালিয়া" }
  ],
  "Jhenaidah": [
    { en: "Jhenaidah Sadar", bn: "ঝিনাইদহ সদর" },
    { en: "Kotchandpur", bn: "কোটচাঁদপুর" },
    { en: "Shailkupa", bn: "শৈলকুপা" },
    { en: "Kaliganj Jhenaidah", bn: "কালীগঞ্জ ঝিনাইদহ" },
    { en: "Maheshpur", bn: "মহেশপুর" }
  ],
  "Joypurhat": [
    { en: "Joypurhat Sadar", bn: "জয়পুরহাট সদর" },
    { en: "Panchbibi", bn: "পাঁচবিবি" },
    { en: "Akkelpur", bn: "আক্কেলপুর" },
    { en: "Kalai Upazila", bn: "কালাই উপজেলা" }
  ],
  "Khagrachhari": [
    { en: "Khagrachhari Sadar", bn: "খাগড়াছড়ি সদর" },
    { en: "Dighinala Valley", bn: "দীঘিনালা ভ্যালি" },
    { en: "Ramgarh Town", bn: "রামগড় টাউন" },
    { en: "Panchhari", bn: "পানছড়ি" },
    { en: "Matiranga", bn: "মাটিরাঙ্গা" }
  ],
  "Khulna": [
    { en: "Khalishpur", bn: "খালিশপুর" },
    { en: "Daulatpur", bn: "দৌলতপুর" },
    { en: "Sonadanga", bn: "সোনাডাঙ্গা" },
    { en: "Khan Jahan Ali", bn: "খান জাহান আলী" },
    { en: "Boyra", bn: "বয়রা" }
  ],
  "Kishoreganj": [
    { en: "Kishoreganj Sadar", bn: "কিশোরগঞ্জ সদর" },
    { en: "Bhairab Bazar", bn: "ভৈরব বাজার" },
    { en: "Bajitpur", bn: "বাজিতপুর" },
    { en: "Katiadi Upazila", bn: "কটিয়াদী উপজেলা" },
    { en: "Karimgonj", bn: "করিমগঞ্জ" }
  ],
  "Kurigram": [
    { en: "Kurigram Sadar", bn: "কুড়িগ্রাম সদর" },
    { en: "Nageshwari Town", bn: "নাগেশ্বরী টাউন" },
    { en: "Ulipur", bn: "উলিপুর" },
    { en: "Phulbari Kurigram", bn: "ফুলবাড়ী কুড়িগ্রাম" },
    { en: "Chilmari Port", bn: "চিলমারী বন্দর" }
  ],
  "Kushtia": [
    { en: "Kushtia Sadar", bn: "কুষ্টিয়া সদর" },
    { en: "Kumarkhali", bn: "কুমারখালী" },
    { en: "Bheramara Power Point", bn: "ভেড়ামারা পাওয়ার পয়েন্ট" },
    { en: "Khoksa Upazila", bn: "খোকসা উপজেলা" },
    { en: "Mirpur Kushtia", bn: "মিরপুর কুষ্টিয়া" }
  ],
  "Lakshmipur": [
    { en: "Lakshmipur Sadar", bn: "লক্ষ্মীপুর সদর" },
    { en: "Ramgati Coast", bn: "রামগতি উপকূল" },
    { en: "Raipur Town", bn: "রায়পুর পৌরসভা" },
    { en: "Ramganj", bn: "রামগঞ্জ" }
  ],
  "Lalmonirhat": [
    { en: "Lalmonirhat Sadar", bn: "লালমনিরহাট সদর" },
    { en: "Patgram Border", bn: "পাটগ্রাম সীমান্ত" },
    { en: "Hatibandha", bn: "হাতীবান্ধা" },
    { en: "Kaliganj Lal", bn: "কালীগঞ্জ লালমনিরহাট" },
    { en: "Aditmari", bn: "আদিতমারী" }
  ],
  "Madaripur": [
    { en: "Madaripur Sadar", bn: "মাদারীপুর সদর" },
    { en: "Shibchar Highway Area", bn: "শিবচর এক্সপ্রেসওয়ে" },
    { en: "Kalkini", bn: "কালকিনি" },
    { en: "Rajoir Upazila", bn: "রাজৈর উপজেলা" }
  ],
  "Magura": [
    { en: "Magura Sadar", bn: "মাগুরা সদর" },
    { en: "Sreepur Commercial", bn: "শ্রীপুর বাণিজ্যিক" },
    { en: "Shalikha", bn: "শালিখা" },
    { en: "Mohammadpur Magura", bn: "মোহাম্মদপুর মাগুরা" }
  ],
  "Manikganj": [
    { en: "Manikganj Sadar", bn: "মানিকগঞ্জ সদর" },
    { en: "Singair Near Dhaka", bn: "সিংগাইর জোন" },
    { en: "Saturia Site", bn: "সাটুরিয়া সাইট" },
    { en: "Shibaloy Port", bn: "শিবালয় ঘাট অঞ্চল" },
    { en: "Harirampur", bn: "হরিরামপুর" }
  ],
  "Meherpur": [
    { en: "Meherpur Sadar", bn: "মেহেরপুর সদর" },
    { en: "Mujibnagar Memorial", bn: "মুজিবনগর স্মৃতিসৌধ জোন" },
    { en: "Gangni Business Center", bn: "গাংনী ক্যাপিটাল রোড" }
  ],
  "Moulvibazar": [
    { en: "Moulvibazar Sadar", bn: "মৌলভীবাজার সদর" },
    { en: "Sreemangal Tea Zone", bn: "শ্রীমঙ্গল চা বাগান জোন" },
    { en: "Kulaura Station", bn: "কুলাউড়া জংশন" },
    { en: "Rajnagar Upazila", bn: "রাজনগর উপজেলা" },
    { en: "Kamalganj", bn: "কমলগঞ্জ" }
  ],
  "Munshiganj": [
    { en: "Munshiganj Sadar", bn: "মুন্সীগঞ্জ সদর" },
    { en: "Mawa Padma Bridge Point", bn: "মাওয়া পদ্মা সেতু পয়েন্ট" },
    { en: "Sirajdikhan Node", bn: "সিরাজদিখান পয়েন্ট" },
    { en: "Tongibari", bn: "টংগিবাড়ী" },
    { en: "Gajaria Industrial", bn: "গজারিয়া শিল্পাঞ্চল" }
  ],
  "Mymensingh": [
    { en: "Sadar", bn: "সদর" },
    { en: "Ganginarpar", bn: "গাঙ্গিনারপাড়" },
    { en: "Charpara", bn: "চরপাড়া" },
    { en: "Valuka", bn: "ভালুকা" }
  ],
  "Naogaon": [
    { en: "Naogaon Sadar", bn: "নওগাঁ সদর" },
    { en: "Patnitala Base", bn: "পত্নীতলা বেস" },
    { en: "Mohadevpur Town", bn: "মহাদেবপুর টাউন" },
    { en: "Manda Upazila", bn: "মান্দা উপজেলা" },
    { en: "Badalgachhi", bn: "বদলগাছী" }
  ],
  "Narail": [
    { en: "Narail Sadar", bn: "নড়াইল সদর" },
    { en: "Lohagara Area", bn: "লোহাগড়া জোন" },
    { en: "Kalia Village Route", bn: "কালিয়া রুট" }
  ],
  "Narayanganj": [
    { en: "Chashiara", bn: "চাষাড়া" },
    { en: "Fatullah", bn: "ফতুল্লা" },
    { en: "Siddhirganj", bn: "সিদ্ধিরগঞ্জ" },
    { en: "Kanchpur", bn: "কাঁচপুর" }
  ],
  "Narsingdi": [
    { en: "Narsingdi Sadar", bn: "নরসিংদী সদর" },
    { en: "Madhabdi Mill Gate", bn: "মাধবদী মিল গেট" },
    { en: "Shibpur Upazila", bn: "শিবপুর উপজেলা" },
    { en: "Raipura Route", bn: "রায়পুরা রুট" },
    { en: "Monohardi", bn: "মনোহরদী" }
  ],
  "Natore": [
    { en: "Natore Sadar", bn: "নাটোর সদর" },
    { en: "Singra ChalanBeel", bn: "সিংড়া চলনবিল জোন" },
    { en: "Lalpur Sugar Mill", bn: "লালপুর চিনিমিল এলাকা" },
    { en: "Baraigram", bn: "বড়াইগ্রাম" }
  ],
  "Nawabganj": [
    { en: "Nawabganj Sadar", bn: "চাঁপাইনবাবগঞ্জ সদর" },
    { en: "Shibganj Mango Yard", bn: "শিবগঞ্জ আম বাজার" },
    { en: "Rohanpur Railway", bn: "রহনপুর রেল স্টেশন রোড" },
    { en: "Nachole", bn: "নাচোল" }
  ],
  "Netrokona": [
    { en: "Netrokona Sadar", bn: "নেত্রকোনা সদর" },
    { en: "Mohanganj Haor Route", bn: "মোহনগঞ্জ হাওর রুট" },
    { en: "Durgapur Hills Area", bn: "দুর্গাপুর পাহাড়ী অঞ্চল" },
    { en: "Kalmakanda", bn: "কলমাকান্দা" }
  ],
  "Nilphamari": [
    { en: "Nilphamari Sadar", bn: "নীলফামারী সদর" },
    { en: "Saidpur Airport Area", bn: "সৈয়দপুর বিমানবন্দর এলাকা" },
    { en: "Domar Station", bn: "ডোমার স্টেশন" },
    { en: "Jaldhaka", bn: "জলঢাকা" }
  ],
  "Noakhali": [
    { en: "Maijdee Court", bn: "মাইজদী কোর্ট" },
    { en: "Begumganj Interchange", bn: "বেগমগঞ্জ চৌরাস্তা" },
    { en: "Senbagh Town", bn: "সেনবাগ পৌরসভা" },
    { en: "Choumuhani Market", bn: "চৌমুহনী বাজার" },
    { en: "Hatiya Island", bn: "হাতিয়া দ্বীপ অঞ্চল" }
  ],
  "Pabna": [
    { en: "Pabna Sadar", bn: "পাবনা সদর" },
    { en: "Ishwardi Junction", bn: "ঈশ্বরদী জংশন" },
    { en: "Santhia Center", bn: "সাঁথিয়া সেন্টার" },
    { en: "Sujanagar", bn: "সুজানগর" },
    { en: "Chatmohar", bn: "চাটমোহর" }
  ],
  "Panchagarh": [
    { en: "Panchagarh Sadar", bn: "পঞ্চগড় সদর" },
    { en: "Tetulia Border View", bn: "তেঁতুলিয়া জিরো পয়েন্ট" },
    { en: "Boda Highway", bn: "বোদা হাইওয়ে" },
    { en: "Debiganj", bn: "দেবীগঞ্জ" }
  ],
  "Patuakhali": [
    { en: "Patuakhali Sadar", bn: "পটুয়াখালী সদর" },
    { en: "Kuakata Sea Beach", bn: "কুয়াকাটা সমুদ্র সৈকত" },
    { en: "Galachipa Coast", bn: "গলাচিপা উপকূল" },
    { en: "Bauphal Upazila", bn: "বাউফল উপজেলা" }
  ],
  "Pirojpur": [
    { en: "Pirojpur Sadar", bn: "পিরোজপুর সদর" },
    { en: "Mathbaria Area", bn: "মঠবাড়িয়া এলাকা" },
    { en: "Bhandaria Station", bn: "ভাণ্ডারিয়া স্টেশন" },
    { en: "Nesarabad Swarupkathi", bn: "নেছারাবাদ স্বরূপকাঠি" }
  ],
  "Rajbari": [
    { en: "Rajbari Sadar", bn: "রাজবাড়ী সদর" },
    { en: "Goalanda Ghat Transit", bn: "গোয়ালন্দ ঘাট ট্রানজিট" },
    { en: "Pangsha Center", bn: "পাংশা সেন্টার" },
    { en: "Baliakandi", bn: "বালিয়াকান্দি" }
  ],
  "Rajshahi": [
    { en: "Motihar", bn: "মতিহার" },
    { en: "Boalia", bn: "বোয়ালিয়া" },
    { en: "Rajpara", bn: "রাজপাড়া" },
    { en: "Shah Makhdum", bn: "শাহ মখদুম" }
  ],
  "Rangamati": [
    { en: "Rangamati Sadar", bn: "রাঙ্গামাটি সদর" },
    { en: "Kaptai Lake Zone", bn: "কাপ্তাই লেক জোন" },
    { en: "Baghaichhari Hills", bn: "বাঘাইছড়ি পাহাড়ী অঞ্চল" },
    { en: "Rajasthali", bn: "রাজস্থলী" }
  ],
  "Rangpur": [
    { en: "Sadar", bn: "সদর" },
    { en: "Modern More", bn: "মডার্ন মোড়" },
    { en: "Dhanmondi Rangpur", bn: "ধানমন্ডি রংপুর" },
    { en: "Medical East", bn: "মেডিকেল পূর্ব গেট" }
  ],
  "Shariatpur": [
    { en: "Shariatpur Sadar", bn: "শরীয়তপুর সদর" },
    { en: "Naria Coastal", bn: "নড়িয়া চর অঞ্চল" },
    { en: "Janjira Bridge Highway", bn: "জাজিরা টোল প্লাজা জোন" },
    { en: "Damudya", bn: "ডামুড্যা" }
  ],
  "Shatkhira": [
    { en: "Satkhira Sadar", bn: "সাতক্ষীরা সদর" },
    { en: "Shyamnagar Forest Edge", bn: "শ্যামনগর সুন্দরবন রুট" },
    { en: "Kaliganj Satkhira", bn: "কালীগঞ্জ সাতক্ষীরা" },
    { en: "Debhata", bn: "দেবহাটা" }
  ],
  "Sherpur": [
    { en: "Sherpur Sadar", bn: "শেরপুর সদর" },
    { en: "Nalitabari Border Area", bn: "নালিতাবাড়ী সীমান্ত জোন" },
    { en: "Sreebardi Corner", bn: "শ্রীবরদী কর্নার" }
  ],
  "Sirajganj": [
    { en: "Sirajganj Sadar", bn: "সিরাজগঞ্জ সদর" },
    { en: "Shahjadpur Heritage", bn: "শাহজাদপুর হেরিটেজ" },
    { en: "Ullahpara Junction", bn: "উল্লাপাড়া জংশন" },
    { en: "Belkuchi Handloom", bn: "বেলকুচি তাঁত শিল্প জোন" }
  ],
  "Sunamganj": [
    { en: "Sunamganj Sadar", bn: "সুনামগঞ্জ সদর" },
    { en: "Chhatak Industrial", bn: "ছাতক শিল্প এলাকা" },
    { en: "Jagannathpur Bazaar", bn: "জগন্নাথপুর বাজার" },
    { en: "Tahirpur Haor Gateway", bn: "তাহিরপুর হাওর গেটওয়ে" }
  ],
  "Sylhet": [
    { en: "Zindabazar", bn: "জিন্দাবাজার" },
    { en: "Uposhahar", bn: "উপশহর" },
    { en: "Amberkhana", bn: "আম্বরখানা" },
    { en: "Bandarbazar", bn: "বন্দরবাজার" },
    { en: "Shibgonj", bn: "শিবগঞ্জ" }
  ],
  "Tangail": [
    { en: "Tangail Sadar", bn: "টাঙ্গাইল সদর" },
    { en: "Mirzapur Cadets Area", bn: "মির্জাপুর ক্যাডেট জোন" },
    { en: "Madhupur Forest Node", bn: "মধুপুর শালবন জোন" },
    { en: "Gopalpur", bn: "গোপালপুর" },
    { en: "Kalihati", bn: "কালিহাতী" }
  ],
  "Thakurgaon": [
    { en: "Thakurgaon Sadar", bn: "ঠাকুরগাঁও সদর" },
    { en: "Pirganj Town", bn: "পীরগঞ্জ টাউন" },
    { en: "Baliadangi Border Area", bn: "বালিয়াডাঙ্গী সীমান্ত জোন" }
  ]
};

export const Cart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    getTranslatedText,
    addToast,
    clearCart,
    placeOrder,
    submitPaymentReceipt,
    user
  } = useShop();

  // Shipping details form (Prefilled from Logged User if exists)
  const [shippingName, setShippingName] = useState(user?.name || '');
  const [shippingPhone, setShippingPhone] = useState(user?.addresses?.[0]?.phone || '');
  const [shippingEmail, setShippingEmail] = useState(user?.email || '');
  const [selectedDistrict, setSelectedDistrict] = useState(user?.addresses?.[0]?.district || 'Dhaka');
  const [selectedArea, setSelectedArea] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState(user?.addresses?.[0]?.address || '');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'pay_dc'>('cod');

  // Sync selectedArea based on district changes
  React.useEffect(() => {
    const list = districtAreas[selectedDistrict] || [
      { en: "Sadar Zone", bn: "সদর এলাকা" },
      { en: "Upazila / Sub-district Zone", bn: "উপজেলা / গ্রামীণ জোন" }
    ];
    if (list.length > 0) {
      setSelectedArea(list[0].en);
    } else {
      setSelectedArea('');
    }
  }, [selectedDistrict]);
  
  // Mobile wallets manual verification variables
  const [bkashNumber, setBkashNumber] = useState('');
  const [bkashTrx, setBkashTrx] = useState('');
  const [nagadNumber, setNagadNumber] = useState('');
  const [nagadTrx, setNagadTrx] = useState('');

  // Pay DC (Advance Delivery Charge) specific variables
  const [dcWallet, setDcWallet] = useState<'bkash' | 'nagad'>('bkash');
  const [dcNumber, setDcNumber] = useState('');
  const [dcTrx, setDcTrx] = useState('');

  // Cart coupon logic
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // checkout success and local loading state
  const [placedOrder, setPlacedOrder] = useState<any | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);

  // Sync user profile coordinates on login
  React.useEffect(() => {
    if (user) {
      if (!shippingName) setShippingName(user.name);
      if (!shippingEmail) setShippingEmail(user.email);
      if (user.addresses && user.addresses.length > 0) {
        const addr = user.addresses[0];
        if (!shippingPhone) setShippingPhone(addr.phone);
        if (!deliveryAddress) setDeliveryAddress(addr.address);
        setSelectedDistrict(addr.district);
      }
    }
  }, [user]);

  const subtotal = cart.reduce((total, item) => {
    if (!item?.product) return total;
    return total + item.product.price * item.quantity;
  }, 0);
  const freeShippingThreshold = 5000;
  const deliveryFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : (selectedDistrict === 'Dhaka' ? 80 : 150);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const finalTotal = subtotal + deliveryFee - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = promoCode.trim().toUpperCase();
    if (formatted === 'ROYMEN10') {
      setDiscountPercent(10);
      addToast(getTranslatedText("10% Promo discount applied!", "১০% কুপন ডিসকাউন্ট সফল!"), "success");
    } else if (formatted === 'WELCOME15') {
      setDiscountPercent(15);
      addToast(getTranslatedText("15% Promo discount applied!", "১৫% কুপন ডিসকাউন্ট সফল!"), "success");
    } else {
      addToast(getTranslatedText("Promo code not valid", "কুপন কোডটি সঠিক নয়"), "error");
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shippingName || !shippingPhone || !deliveryAddress) {
      addToast(getTranslatedText("Please fill in Name, Phone, and Address", "অনুগ্রহ করে নাম, মোবাইল নম্বর এবং ঠিকানা পূরণ করুন"), "error");
      return;
    }

    if (shippingPhone.length < 11) {
      addToast(getTranslatedText("Please enter a valid 11-digit Bangladeshi mobile number", "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন"), "error");
      return;
    }

    if (paymentMethod === 'bkash' && (!bkashNumber || !bkashTrx)) {
      addToast(getTranslatedText("Please fill out bKash sender number and TrxID", "বিকাশ নম্বর এবং ট্রানজেকশন আইডি প্রদান করুন"), "error");
      return;
    }

    if (paymentMethod === 'nagad' && (!nagadNumber || !nagadTrx)) {
      addToast(getTranslatedText("Please fill out Nagad sender number and TrxID", "নগদ নম্বর এবং ট্রানজেকশন আইডি প্রদান করুন"), "error");
      return;
    }

    if (paymentMethod === 'pay_dc' && deliveryFee > 0 && (!dcNumber || !dcTrx)) {
      addToast(getTranslatedText("Please fill out sender number and TrxID for the Delivery Charge", "ডেলিভারি চার্জের জন্য বিকাশ/নগদ নম্বর এবং ট্রানজেকশন আইডি প্রদান করুন"), "error");
      return;
    }

    setIsPlacing(true);

    const billingDetails = {
      name: shippingName,
      phone: shippingPhone,
      email: shippingEmail || user?.email || 'guest@roymen.com',
      address: selectedArea ? `${selectedArea}, ${deliveryAddress}` : deliveryAddress,
      district: selectedDistrict
    };

    const timeline = selectedDistrict === 'Dhaka' ? '24 - 48 Hours' : '3 - 5 Days';
    
    // Save coupon percent as promo metadata before placing
    if (discountPercent > 0) {
      localStorage.setItem('roymen_campaign_promo', String(discountPercent));
    } else {
      localStorage.removeItem('roymen_campaign_promo');
    }

    const createdOrder = await placeOrder(billingDetails, paymentMethod, timeline);
    setIsPlacing(false);

    if (createdOrder) {
      const actualOrderId = createdOrder.orderId || createdOrder.id;

      // Submit manual transactional codes instantly to the backend
      if (paymentMethod === 'bkash') {
        await submitPaymentReceipt(
          actualOrderId,
          'bkash',
          bkashTrx.trim().toUpperCase(),
          bkashNumber.trim(),
          finalTotal
        );
      } else if (paymentMethod === 'nagad') {
        await submitPaymentReceipt(
          actualOrderId,
          'nagad',
          nagadTrx.trim().toUpperCase(),
          nagadNumber.trim(),
          finalTotal
        );
      } else if (paymentMethod === 'pay_dc' && deliveryFee > 0) {
        await submitPaymentReceipt(
          actualOrderId,
          dcWallet,
          dcTrx.trim().toUpperCase(),
          dcNumber.trim(),
          deliveryFee
        );
      }

      setPlacedOrder({
        ...createdOrder,
        name: shippingName,
        phone: shippingPhone,
        email: shippingEmail,
        address: `${selectedArea ? selectedArea + ', ' : ''}${deliveryAddress}, ${selectedDistrict}, Bangladesh`,
        payment: paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 
                 (paymentMethod === 'bkash' ? 'bKash Mobile Wallet' : 
                 (paymentMethod === 'nagad' ? 'Nagad Mobile Wallet' : 
                 `Pay DC (${dcWallet.toUpperCase()} Advance Delivery Charge)`)),
        timeline
      });
      localStorage.removeItem('roymen_campaign_promo');
    }
  };

  const districts = [
    "Bagerhat",
    "Bandarban",
    "Barguna",
    "Barisal",
    "Bhola",
    "Bogra",
    "Brahmanbaria",
    "Chandpur",
    "Chittagong",
    "Chuadanga",
    "Comilla",
    "Cox's Bazar",
    "Dhaka",
    "Dinajpur",
    "Faridpur",
    "Feni",
    "Gaibandha",
    "Gazipur",
    "Gopalganj",
    "Habiganj",
    "Jamalpur",
    "Jessore",
    "Jhalokati",
    "Jhenaidah",
    "Joypurhat",
    "Khagrachhari",
    "Khulna",
    "Kishoreganj",
    "Kurigram",
    "Kushtia",
    "Lakshmipur",
    "Lalmonirhat",
    "Madaripur",
    "Magura",
    "Manikganj",
    "Meherpur",
    "Moulvibazar",
    "Munshiganj",
    "Mymensingh",
    "Naogaon",
    "Narail",
    "Narayanganj",
    "Narsingdi",
    "Natore",
    "Nawabganj",
    "Netrokona",
    "Nilphamari",
    "Noakhali",
    "Pabna",
    "Panchagarh",
    "Patuakhali",
    "Pirojpur",
    "Rajbari",
    "Rajshahi",
    "Rangamati",
    "Rangpur",
    "Shariatpur",
    "Shatkhira",
    "Sherpur",
    "Sirajganj",
    "Sunamganj",
    "Sylhet",
    "Tangail",
    "Thakurgaon"
  ];

  // SUCCESS OUTCOME SCREEN DISPLAY
  if (placedOrder) {
    return (
      <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen py-16 transition-colors">
        <div className="max-w-3xl mx-auto px-4">
          <div className="border border-zinc-100 dark:border-zinc-900 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950 p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
            
            {/* Absolute visual premium stamp */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-black dark:bg-white"></div>
            
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mb-2">
              <CheckCircle size={48} className="stroke-[1.5]" />
            </div>

            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-wider text-black dark:text-white">
              {getTranslatedText("Sartorial Decree Created", "অর্ডার সফলভাবে প্রাপ্ত")}
            </h1>
            <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase mb-6">
              ORDER REF ID: <span className="text-black dark:text-white font-black">{placedOrder.orderId}</span>
            </p>

            <div className="text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
              {getTranslatedText(
                `Honorable ${placedOrder.name}, your request to Wear Confidence with ROYMEN premium menswear has been validated. Our dedicated tailoring coordinators in Mohammadpur, Dhaka, are actively preparing your selected garments.`,
                `সম্মানিত ${placedOrder.name}, রয়মেন পোশাকের চেকআউট সফল হয়েছে! মোহাম্মদপুর থেকে আপনার কুরিয়ার প্যাকেটটি প্রস্তুত করা হচ্ছে।`
              )}
            </div>

            {/* Timelines alert box */}
            <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg max-w-md mx-auto flex items-center space-x-3 text-left">
              <div className="p-2 rounded bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white font-bold shrink-0 text-center text-xs font-mono">
                📅
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                  {getTranslatedText("Estimated Home Delivery Timeline", "সম্ভাব্য ডেলিভারি সময়সীমা")}
                </h4>
                <p className="text-xs text-zinc-500 font-bold mt-0.5">{placedOrder.timeline}</p>
              </div>
            </div>

            {/* Invoice Table Recap */}
            <div className="border-t border-b border-zinc-200 dark:border-zinc-850 py-6 text-left space-y-4 max-w-lg mx-auto">
              <h3 className="text-xs font-black uppercase tracking-wider text-black dark:text-white mb-2">
                {getTranslatedText("Receipt Summary", "অর্ডার রসিদ")}
              </h3>
              
              <div className="space-y-2 text-xs font-medium">
                {placedOrder.items.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between text-zinc-650 dark:text-zinc-350">
                    <span className="line-clamp-1">{item.product.name} (x{item.quantity})</span>
                    <span className="font-mono font-bold text-black dark:text-white shrink-0">৳{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-200 dark:border-zinc-850 pt-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-500">
                  <span>{getTranslatedText("Subtotal", "সাবটোটাল")}</span>
                  <span className="font-mono">৳{placedOrder.subtotal.toLocaleString()}</span>
                </div>
                {placedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>{getTranslatedText("Voucher Discount", "ডিসকাউন্ট")}</span>
                    <span className="font-mono">-৳{placedOrder.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-500">
                  <span>{getTranslatedText("Home Delivery Fee", "ডেলিভারি ফি")}</span>
                  <span className="font-mono">
                    {placedOrder.deliveryFee === 0 ? getTranslatedText("FREE", "ফ্রি") : `৳${placedOrder.deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between font-black text-black dark:text-white text-sm border-t border-zinc-150 dark:border-zinc-850 pt-2">
                  <span>{getTranslatedText("Paid amount", "সর্বমোট বিল")}</span>
                  <span className="text-base font-mono">৳{placedOrder.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-zinc-500 space-y-1">
                <p>📍 <strong className="text-zinc-800 dark:text-zinc-350">{getTranslatedText("Address:", "ঠিকানা:")}</strong> {placedOrder.address}</p>
                <p>📞 <strong className="text-zinc-800 dark:text-zinc-350">{getTranslatedText("Contact Mobile Phone:", "মোবাইল নম্বর:")}</strong> {placedOrder.phone}</p>
                <p>💳 <strong className="text-zinc-800 dark:text-zinc-350">{getTranslatedText("Selected Payment Handler:", "পেমেন্ট:")}</strong> {placedOrder.payment}</p>
              </div>
            </div>

            <div className="pt-4 flex justify-center space-x-4">
              <Link
                to="/"
                className="px-6 py-3 bg-black hover:bg-zinc-900 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-xs font-black uppercase tracking-widest rounded transition-transform hover:scale-105"
              >
                {getTranslatedText("Back To Home", "হোম পেইজ")}
              </Link>
              <Link
                to="/shop"
                className="px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 text-xs font-black uppercase tracking-widest rounded"
              >
                {getTranslatedText("Continue Shopping", "অতিরিক্ত শপিং")}
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // SHOPPING TRAY EMPTY STATE
  if (cart.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white min-h-screen py-20 text-center space-y-6 transition-colors">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <ShoppingBag size={64} className="mx-auto text-zinc-300 stroke-1" />
          <h2 className="text-xl font-bold uppercase tracking-widest">
            {getTranslatedText("Your Bag is Completely Empty", "কার্ট ব্যাগটি সম্পূর্ণ খালি")}
          </h2>
          <p className="text-xs text-zinc-500 font-medium leading-relaxed">
            {getTranslatedText(
              "Drape beautifully in premium Bangladeshi apparel. Discover T-Shirts, Oxford Cotton Shirts, and Royal Festive Panjabis in our online showcase.",
              "রয়মেন-এর রাজকীয় পাঞ্জাবি, টি-শার্ট ও শার্ট সংগ্রহ দেখতে আমাদের ক্যাটাগরি পেইজগুলো পরিদর্শন করুন।"
            )}
          </p>
          <div className="pt-4">
            <Link
              to="/shop"
              className="px-8 py-3.5 bg-black text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-black uppercase tracking-widest rounded transition-transform hover:scale-105 inline-block"
            >
              {getTranslatedText("Go To Shop All Catalog", "সব পোশাক শপ করুন")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-widest text-black dark:text-white mb-8 border-b border-zinc-100 dark:border-zinc-900 pb-4">
          {getTranslatedText("Bespoke Order Checkout", "অর্ডার প্লেসমেন্ট ও ব্যাগ")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT GIRD segment: Address Form + Vouchers info (col: 7) */}
          <div className="lg:col-span-7 space-y-8">
            
            <form onSubmit={handlePlaceOrder} className="bg-zinc-50 dark:bg-zinc-900/40 p-6 sm:p-8 rounded-xl border border-zinc-150 dark:border-zinc-850 space-y-6">
              
              <h2 className="text-sm font-black uppercase tracking-widest text-black dark:text-white flex items-center">
                <span>1. {getTranslatedText("Shipping & Delivery Information", "ডেলিভারি ও কুরিয়ার ঠিকানা")}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
                
                <div className="space-y-1">
                  <label className="text-zinc-500 uppercase tracking-wider text-[10px] font-extrabold block">
                    {getTranslatedText("Customer Full Name:", "গ্রাহকের নাম:")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingName}
                    onChange={(e) => setShippingName(e.target.value)}
                    placeholder="e.g. Istiaque Kabir"
                    className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-805 rounded focus:ring-1 focus:ring-black dark:focus:ring-white text-zinc-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-500 uppercase tracking-wider text-[10px] font-extrabold block">
                    {getTranslatedText("Bangladeshi Mobile Contact:", "মোবাইল নম্বর:")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={shippingPhone}
                    onChange={(e) => setShippingPhone(e.target.value)}
                    placeholder="e.g. 01711223344"
                    title="Please enter valid 11 digit mobile number starting with 01"
                    className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-805 rounded focus:ring-1 focus:ring-black dark:focus:ring-white text-zinc-900 dark:text-white"
                  />
                  <span className="text-[9px] text-zinc-400 font-mono tracking-wide">
                    {getTranslatedText("Important: Starts with 01 representing active local SIM phone", "অবশ্যই সচল ১১ ডিজিটের মোবাইল নম্বর দিন")}
                  </span>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-zinc-500 uppercase tracking-wider text-[10px] font-extrabold block">
                    {getTranslatedText("Email Address (Optional):", "ইমেইল অ্যাড্রেস (ঐচ্ছিক):")}
                  </label>
                  <input
                    type="email"
                    value={shippingEmail}
                    onChange={(e) => setShippingEmail(e.target.value)}
                    placeholder="e.g. istiaque@gmail.com"
                    className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-805 rounded focus:ring-1 focus:ring-black dark:focus:ring-white text-zinc-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2 col-span-2">
                  <label className="text-zinc-500 uppercase tracking-wider text-[10px] font-extrabold block">
                    {getTranslatedText("Home District Selection:", "জেলা নির্বাচন:")}
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-805 rounded focus:ring-1 focus:ring-black dark:focus:ring-white text-zinc-900 dark:text-white font-bold"
                  >
                    {districts.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Dynamic Area selection below District selection */}
                <div className="space-y-1 sm:col-span-2 col-span-2" id="checkout-area-dropdown-wrapper">
                  <label htmlFor="area-dropdown" className="text-zinc-500 dark:text-zinc-400 uppercase tracking-widest text-[10px] font-black block flex items-center justify-between">
                    <span>{getTranslatedText("Specific Area / Location:", "নির্দিষ্ট এলাকা / বিবরণ:")} <span className="text-red-500">*</span></span>
                    <span className="text-[8px] bg-zinc-900/10 dark:bg-zinc-100/10 text-zinc-800 dark:text-zinc-200 px-1.5 py-0.5 rounded uppercase tracking-widest font-extrabold transition-all border border-zinc-200/50 dark:border-zinc-800">Auto-Filtered</span>
                  </label>
                  <select
                    id="area-dropdown"
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-250 dark:border-zinc-800 rounded focus:ring-1 focus:ring-black dark:focus:ring-white text-zinc-900 dark:text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    {(districtAreas[selectedDistrict] || [
                      { en: "Sadar Zone", bn: "সদর এলাকা" },
                      { en: "Upazila / Sub-district Zone", bn: "উপজেলা / গ্রামীণ জোন" }
                    ]).map((areaObj) => (
                      <option key={areaObj.en} value={areaObj.en}>
                        {getTranslatedText(areaObj.en, areaObj.bn)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-zinc-500 uppercase tracking-wider text-[10px] font-extrabold block">
                    {getTranslatedText("Full Address (Thana, Road, House, Flat):", "পূর্ণাঙ্গ ঠিকানা (থানা, হাউজ, রোড, ফ্ল্যাট):")} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder={getTranslatedText("House 12, Road 4, Sector 7, Uttara, Dhaka", "উত্তরা ৮ নাম্বার সেক্টর, রোড ৫, হাউজ ২২, ফ্ল্যাট ৩বি")}
                    className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-805 rounded focus:ring-1 focus:ring-black dark:focus:ring-white text-zinc-900 dark:text-white"
                  />
                </div>

              </div>

              {/* 2. Localization Payment select structure */}
              <div className="space-y-4 pt-4 border-t border-zinc-150/50 dark:border-zinc-850">
                <h2 className="text-sm font-black uppercase tracking-widest text-black dark:text-white">
                  2. {getTranslatedText("Payment Gateway Method", "পেমেন্ট মেথড")}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  
                  {/* COD selection block */}
                  <label className={`p-4 border rounded-lg cursor-pointer flex items-start space-x-3 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-black dark:border-white bg-zinc-100/50 dark:bg-zinc-850'
                      : 'border-zinc-200 dark:border-zinc-800'
                  }`}>
                    <input
                      type="radio"
                      name="payment_select"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1"
                    />
                    <div className="text-xs">
                      <p className="font-extrabold uppercase tracking-wide text-black dark:text-white">
                        {getTranslatedText("COD Services", "ক্যাশ অন ডেলিভারি")}
                      </p>
                      <p className="text-[10px] text-zinc-400 mt-1">
                        {getTranslatedText("Convenient Cash Payment on product unpacking.", "হাতে ড্রেস পেয়ে চেক করে মূল্য পরিশোধ করুন")}
                      </p>
                    </div>
                  </label>

                  {/* bKash Wallet selector */}
                  <label className={`p-4 border rounded-lg cursor-pointer flex items-start space-x-3 transition-all ${
                    paymentMethod === 'bkash'
                      ? 'border-pink-500 bg-pink-50/10 dark:bg-pink-950/10'
                      : 'border-zinc-200 dark:border-zinc-800'
                  }`}>
                    <input
                      type="radio"
                      name="payment_select"
                      checked={paymentMethod === 'bkash'}
                      onChange={() => setPaymentMethod('bkash')}
                      className="mt-1 accent-pink-500"
                    />
                    <div className="text-xs">
                      <p className="font-extrabold uppercase tracking-wide text-pink-600 dark:text-pink-400">
                        {getTranslatedText("bKash Wallet", "বিকাশ পেমেন্ট")}
                      </p>
                      <p className="text-[10px] text-zinc-400 mt-1">
                        {getTranslatedText("Send money to official wallet & insert ID.", "বিকাশে সেন্ডমানি করে ট্রানজেকশন আইডি দিন")}
                      </p>
                    </div>
                  </label>

                  {/* Nagad Wallet selector */}
                  <label className={`p-4 border rounded-lg cursor-pointer flex items-start space-x-3 transition-all ${
                    paymentMethod === 'nagad'
                      ? 'border-orange-500 bg-orange-50/10 dark:bg-orange-950/10'
                      : 'border-zinc-200 dark:border-zinc-800'
                  }`}>
                    <input
                      type="radio"
                      name="payment_select"
                      checked={paymentMethod === 'nagad'}
                      onChange={() => setPaymentMethod('nagad')}
                      className="mt-1 accent-orange-500"
                    />
                    <div className="text-xs">
                      <p className="font-extrabold uppercase tracking-wide text-orange-600 dark:text-orange-400">
                        {getTranslatedText("Nagad Wallet", "নগদ পেমেন্ট")}
                      </p>
                      <p className="text-[10px] text-zinc-400 mt-1">
                        {getTranslatedText("Send money to Nagad wallet & insert ID.", "নগদে সেন্ডমানি করে ট্রানজেকশন আইডি দিন")}
                      </p>
                    </div>
                  </label>

                  {/* Pay DC selector */}
                  <label className={`p-4 border rounded-lg cursor-pointer flex items-start space-x-3 transition-all ${
                    paymentMethod === 'pay_dc'
                      ? 'border-yellow-600 bg-yellow-50/10 dark:bg-yellow-950/10'
                      : 'border-zinc-200 dark:border-zinc-800'
                  }`}>
                    <input
                      type="radio"
                      name="payment_select"
                      checked={paymentMethod === 'pay_dc'}
                      onChange={() => setPaymentMethod('pay_dc')}
                      className="mt-1 accent-yellow-650"
                    />
                    <div className="text-xs">
                      <p className="font-extrabold uppercase tracking-wide text-yellow-600 dark:text-yellow-500">
                        {getTranslatedText("Pay DC Only", "ডেলিভারি চার্জ অগ্রিম")}
                      </p>
                      <p className="text-[10px] text-zinc-400 mt-1">
                        {getTranslatedText("Pay only Delivery Charge (DC) in advance, rest COD.", "শুধুমাত্র ডেলিভারি চার্জ অগ্রিম পরিশোধ করুন, বাকি কুরিয়ারে")}
                      </p>
                    </div>
                  </label>

                </div>

                {/* Pay DC advance payment details card */}
                {paymentMethod === 'pay_dc' && (
                  <div className="p-4 bg-yellow-50/20 dark:bg-yellow-950/10 border border-yellow-250 dark:border-yellow-950 rounded-lg space-y-4 text-xs font-medium">
                    <p className="text-zinc-650 dark:text-zinc-300 leading-relaxed font-semibold">
                      💬 {getTranslatedText(
                        `Please send the Advance Delivery Charge of BDT ৳${deliveryFee} through bKash or Nagad to our official Send Money wallet: 01721922927 (Reference: ROYMEN). Submit deposit details below:`,
                        `দয়া করে অগ্রিম ডেলিভারি চার্জ ৳${deliveryFee} নিচের বিকাশ/নগদ নাম্বারে সেন্ডমানি করে (রেফারেন্স: ROYMEN) নিচে ট্রানজেকশন তথ্য দিন: ০১৭২১৯২২৯২৭`
                      )}
                    </p>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 block">{getTranslatedText("Select Payment Wallet:", "পেমেন্ট মাধ্যম বেছে নিন:")}</label>
                      <div className="flex space-x-6">
                        <label className="flex items-center space-x-2 cursor-pointer text-xs font-black">
                          <input
                            type="radio"
                            name="dc_wallet_select"
                            checked={dcWallet === 'bkash'}
                            onChange={() => setDcWallet('bkash')}
                            className="accent-pink-500"
                          />
                          <span className="text-pink-600 dark:text-pink-400">bKash</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer text-xs font-black">
                          <input
                            type="radio"
                            name="dc_wallet_select"
                            checked={dcWallet === 'nagad'}
                            onChange={() => setDcWallet('nagad')}
                            className="accent-orange-500"
                          />
                          <span className="text-orange-600 dark:text-orange-400">Nagad</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-zinc-500 block">
                          {dcWallet === 'bkash' 
                            ? getTranslatedText("Sender bKash No:", "ডিপোজিট বিকাশ নম্বর:") 
                            : getTranslatedText("Sender Nagad No:", "ডিপোজিট নগদ নম্বর:")}
                        </label>
                        <input
                          type="tel"
                          required
                          value={dcNumber}
                          onChange={(e) => setDcNumber(e.target.value)}
                          placeholder="017xxxxxxxx"
                          className="w-full p-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded text-xs select-auto text-zinc-900 dark:text-white font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-zinc-500 block">{getTranslatedText("Transaction TrxID code:", "ট্রানজেকশন আইডি (TrxID):")}</label>
                        <input
                          type="text"
                          required
                          value={dcTrx}
                          onChange={(e) => setDcTrx(e.target.value)}
                          placeholder="e.g. K9C2D2E4"
                          className="w-full p-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded text-xs select-auto text-zinc-900 dark:text-white font-bold"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub bKash form elements rendered conditionally */}
                {paymentMethod === 'bkash' && (
                  <div className="p-4 bg-pink-50/20 dark:bg-pink-950/10 border border-pink-100 dark:border-pink-950 rounded-lg space-y-4 text-xs">
                    <p className="text-zinc-650 dark:text-zinc-300 leading-relaxed font-semibold">
                      💬 {getTranslatedText(
                        "Please transmit total order value BDT to our official Send Money wallet: 01721922927. Note ROYMEN in reference, then insert transactional details below:",
                        "আমাদের অফিশিয়াল সেন্ডমানি বিকাশ নাম্বারে মূল্য পাঠান: 01721922927 । রেফারেন্স বক্সে লিখুন - ROYMEN এবং নিচের ইনপুটে ট্রানজেকশন আইডি দিন:"
                      )}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-zinc-500 block">{getTranslatedText("Sender bKash No:", "ডিপোজিট বিকাশ নম্বর:")}</label>
                        <input
                          type="tel"
                          required
                          value={bkashNumber}
                          onChange={(e) => setBkashNumber(e.target.value)}
                          placeholder="017xxxxxxxx"
                          className="w-full p-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded text-xs select-auto text-zinc-900 dark:text-white font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-zinc-500 block">{getTranslatedText("Transaction TrxID code:", "বিকাশ ট্রানজেকশন আইডি (TrxID):")}</label>
                        <input
                          type="text"
                          required
                          value={bkashTrx}
                          onChange={(e) => setBkashTrx(e.target.value)}
                          placeholder="e.g. K9C2D2E4"
                          className="w-full p-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded text-xs select-auto text-zinc-900 dark:text-white font-bold"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Nagad form details */}
                {paymentMethod === 'nagad' && (
                  <div className="p-4 bg-orange-50/20 dark:bg-orange-950/10 border border-orange-100 dark:border-orange-950 rounded-lg space-y-4 text-xs font-medium">
                    <p className="text-zinc-650 dark:text-zinc-300 leading-relaxed font-semibold">
                      💬 {getTranslatedText(
                        "Please transmit total order value BDT to our official Send Money wallet: 01721922927. Note ROYMEN in reference, then insert transactional details below:",
                        "আমাদের অফিশিয়াল সেন্ডমানি নগদ নাম্বারে মূল্য পাঠান: 01721922927 । রেফারেন্স বক্সে লিখুন - ROYMEN এবং নিচের ইনপুটে ট্রানজেকশন আইডি দিন:"
                      )}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-zinc-500 block">{getTranslatedText("Sender Nagad No:", "ডিপোজিট নগদ নম্বর:")}</label>
                        <input
                          type="tel"
                          required
                          value={nagadNumber}
                          onChange={(e) => setNagadNumber(e.target.value)}
                          placeholder="017xxxxxxxx"
                          className="w-full p-2 bg-white dark:bg-zinc-950 border border-orange-200 dark:border-zinc-800 rounded text-xs select-auto text-zinc-900 dark:text-white font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-zinc-500 block">{getTranslatedText("Transaction TrxID code:", "নগদ ট্রানজেকশন আইডি (TrxID):")}</label>
                        <input
                          type="text"
                          required
                          value={nagadTrx}
                          onChange={(e) => setNagadTrx(e.target.value)}
                          placeholder="e.g. N9C2D2E4"
                          className="w-full p-2 bg-white dark:bg-zinc-950 border border-orange-200 dark:border-zinc-800 rounded text-xs select-auto text-zinc-900 dark:text-white font-bold"
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Submit trigger button */}
              <button
                id="place-order-submit-btn"
                type="submit"
                className="w-full py-4 px-4 bg-black text-white hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-xs font-black uppercase tracking-[0.2em] rounded transition-transform active:scale-95 flex items-center justify-center space-x-1.5"
              >
                <span>{getTranslatedText("Finalize Order Decree", "অর্ডার কনফার্ম করুন")}</span>
              </button>

            </form>

          </div>

          {/* RIGHT GRID segment: Checkout billing table reviews (col: 5) */}
          <aside className="lg:col-span-5 space-y-6">
            
            <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-850 rounded-xl p-6 space-y-6">
              
              <h3 className="text-sm font-black uppercase tracking-widest text-black dark:text-white pb-3 border-b border-zinc-150 dark:border-zinc-850">
                {getTranslatedText("Review Selections", "পছন্দকৃত পোশাক সমূহ")}
              </h3>

              {/* Items row iterator */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-start text-xs border-b border-zinc-100 dark:border-zinc-900 pb-3 last:border-0 last:pb-0">
                    <img src={item.product.images[0] || null} alt="" referrerPolicy="no-referrer" className="w-12 aspect-[3/4] object-cover rounded bg-zinc-100 shrink-0" />
                    <div className="ml-3 flex-1">
                      <p className="font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">{item.product.name}</p>
                      <p className="text-[10px] text-zinc-400 font-mono mt-0.5">SIZE: {item.selectedSize} | QUANTITY: {item.quantity}</p>
                    </div>
                    <div className="text-right ml-2 shrink-0">
                      <p className="font-bold">৳{(item.product.price * item.quantity).toLocaleString()}</p>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                        className="text-red-500 hover:text-red-700 font-bold text-[10px] mt-1 inline-flex items-center"
                        title="Delete selection"
                      >
                        <Trash2 size={11} className="mr-0.5" />
                        <span>{getTranslatedText("Remove", "বাতিল")}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo validation inline form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder={getTranslatedText("Promo Code (e.g. WELCOME15)", "কুপন কোড (যেমন: WELCOME15)")}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-805 rounded px-3 py-2 text-xs w-full text-zinc-900 dark:text-white"
                />
                <button
                  id="cart-apply-promo-btn"
                  type="submit"
                  className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-black uppercase text-xs rounded tracking-widest hover:bg-zinc-800 hover:text-white text-zinc-950"
                >
                  {getTranslatedText("Apply", "সাবমিট")}
                </button>
              </form>

              {/* Accumulation recap list */}
              <div className="space-y-2 text-xs border-t border-zinc-150 dark:border-zinc-850 pt-4 font-semibold">
                <div className="flex justify-between text-zinc-500">
                  <span>{getTranslatedText("Cart Subtotal", "মোট মূল্য")}</span>
                  <span className="font-mono">৳{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>{getTranslatedText("Promo applied discount", "ডিসকাউন্ট")} ({discountPercent}%)</span>
                    <span className="font-mono">-৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-500">
                  <span>{getTranslatedText("BD Dispatch Delivery", "কুরিয়ার ফি")}</span>
                  <span className="font-mono">
                    {deliveryFee === 0 ? getTranslatedText("FREE", "ফ্রি") : `৳${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-black dark:text-white font-black text-sm border-t border-zinc-150 dark:border-zinc-850 pt-3">
                  <span>{getTranslatedText("Sum total", "সর্বমোট পরিশোধ")}</span>
                  <span className="text-base font-mono">৳{finalTotal.toLocaleString()}</span>
                </div>

                {paymentMethod === 'pay_dc' && (
                  <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/35 rounded text-[11px] space-y-1 text-zinc-905 dark:text-yellow-405 font-bold leading-normal">
                    <div className="flex justify-between font-black text-yellow-700 dark:text-yellow-450">
                      <span>{getTranslatedText("Advance Delivery Charge (DC) due now:", "অগ্রিম ডেলিভারি চার্জ (বিকাশ/নগদ):")}</span>
                      <span className="font-mono">৳{deliveryFee}</span>
                    </div>
                    <div className="flex justify-between font-black text-zinc-900 dark:text-white pt-1 border-t border-dashed border-zinc-300 dark:border-zinc-800">
                      <span>{getTranslatedText("Remaining Cash on Delivery (COD) on arrival:", "বাকি মূল্য (ক্যাশ অন ডেলিভারি):")}</span>
                      <span className="font-mono">৳{(finalTotal - deliveryFee).toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Back action link */}
            <div className="text-center pt-2">
              <Link to="/shop" className="text-xs text-zinc-400 hover:text-black dark:hover:text-white inline-flex items-center font-bold uppercase tracking-wider">
                <ArrowLeft size={12} className="mr-1" />
                <span>{getTranslatedText("Browse More Menswear", "আরও পোশাক শপ করুন")}</span>
              </Link>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
};
