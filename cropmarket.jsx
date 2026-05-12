import { useState, useEffect, useRef, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Area } from "recharts";
import {
  MapPin, Bell, Star, CloudRain, TrendingUp, TrendingDown, Minus,
  Search, ChevronRight, AlertTriangle, CheckCircle, Droplets, Wind,
  Sun, Package, Leaf, Home, BarChart2, Wrench, X, Plus,
  ChevronDown, Clock, Mic, Volume2, VolumeX, Globe, Compass,
  Calculator, Check, RefreshCw, Settings as SettingsIcon
} from "lucide-react";


const T = {
  en: {
    appName:"CropMarket", tagline:"Smart farming decisions",
    home:"Home", markets:"Markets", watch:"Watch", tools:"Tools", trip:"Trip",
    chooseLanguage:"Choose your language", selectDistrict:"Select your district",
    autoDetect:"Detect my location", detecting:"Detecting...", detected:"Location found",
    orSearch:"or search below",
    selectState:"Select your state",
    searchState:"Search state...",
    searchDistrict:"Search district...",
    confirmDistrict:"Confirm District", continueBtn:"Continue", back:"Back",
    district:"District",
    sellNow:"SELL NOW", wait:"WAIT",
    reasonSell:"High supply or falling price — sell quickly.",
    reasonWait:"Low supply + rising price — hold for better returns.",
    reasonRain:"Heavy rain in 2 days — sell before harvest risk.",
    todayPrice:"Today's Price Range", sevenDay:"7-Day Price Trend",
    trendRising:"Rising", trendFalling:"Falling", trendStable:"Stable",
    LOW:"LOW supply", NORMAL:"NORMAL supply", HIGH:"HIGH supply",
    nearbyMarkets:"Nearby Markets", seeAll:"See all",
    harvestRisk:"Harvest Risk Alert", harvestRiskSub:"Heavy rain forecast. Sell or cover storage now.",
    updatedToday:"Updated today", bestToday:"Best",
    listening:"Listening...", notHeard:"Not recognised, try again.",
    tripCalc:"Trip Cost Calculator",
    quantity:"Quantity (Quintals)", vehicle:"Vehicle", petrolPrice:"Petrol (Rs/L)",
    laborDays:"Labour Days", dailyWage:"Daily Wage (Rs)",
    fuelCost:"Fuel Cost", laborCost:"Labour Cost",
    totalCost:"Total Trip Cost", revenue:"Expected Revenue", netProfit:"Net Profit",
    goGo:"WORTH THE TRIP", noGo:"NOT WORTH IT",
    bestMarket:"Best Market", compareAll:"Compare All Markets",
    bike:"2-Wheeler", autoV:"Auto", car:"Car/Jeep", truck:"Tractor",
    localSell:"Sell Locally (no trip)",
    aboveMSP:"Above MSP", nearMSP:"Near MSP", belowMSP:"Below MSP",
    weather:"Weather", today:"Today", tomorrow:"Tomorrow",
    storageAdvisory:"Storage Advisory",
    schemes:"Schemes", msp:"MSP", storage:"Storage", convert:"Convert", calendar:"Calendar",
    min:"Min", max:"Max", modal:"Modal", searchCrop:"Search crop...",
    perQtl:"/qtl", add:"Add", setAlert:"Set Alert", addAlert:"New Alert",
    notifyAbove:"Price rises above", notifyBelow:"Price drops below",
    watchlist:"Watchlist", alerts:"Price Alerts",
    noWatchlist:"No crops in watchlist.", noAlerts:"No alerts set.",
    allCrops:"All Crops", tip:"Tip", shelfLife:"Shelf Life",
    moistureRisk:"Moisture Risk",
    marketAPMC:" APMC", marketSubMandi:" Sub-mandi",
    marketRegional:"Regional Market", marketStateHub:"State APMC Hub", storageDays:"Storage Days",
    enterArea:"Enter area value", selectUnit:"Select unit:", quickRef:"Quick Reference",
    sow:"Sow Season", harvest:"Harvest Season", bestSell:"Best Sell Window",
    cropCalendar:"Crop Calendar",
    voiceHint:"Voice works best on Chrome/Android",
    voiceRecognised:"Recognised",
    kmUnit:"km", qtlUnit:"qtl",
    moistureHighRisk:"HIGH RISK", moistureLowRisk:"LOW RISK", moistureMedium:"MEDIUM",
    shelfLabel:"Shelf Life", moisture:"Moisture Risk",
    unitGuntha:"Guntha", unitAcre:"Acre", unitBigha:"Bigha", unitCent:"Cent",
    ref1a:"1 Acre", ref1b:"= 40 Guntha = 100 Cent",
    ref2a:"1 Hectare", ref2b:"= 2.47 Acres",
    ref3a:"1 Bigha (AP/Telangana)", ref3b:"≈ 0.62 Acres",
    ref4a:"1 Guntha", ref4b:"= 121 sq yards",
    filterCrop:"Filter by Crop",
    dayPrefix:"Day",
    cropLabel:"Crop", typeLabel:"Type", priceLabel:"Price (Rs/qtl)", cancelBtn:"Cancel",
    gross:"Gross", netAfterCosts:"Net after trip costs",
    convertTo:"→ Acres + Ha", acresUnit:"acres", hectaresUnit:"hectares",
    daysUnit:"days", mspVsMarket:"MSP vs Market", marketLabel:"Market",
    qtlX:"qtl ×", qtlPh:"Qtls", areaPh:"e.g. 5", pricePh:"e.g. 2000",
    highBadge:"HIGH", lowBadge:"LOW",
    days:{"Mon":"Mon","Tue":"Tue","Wed":"Wed","Thu":"Thu","Fri":"Fri","Sat":"Sat","Sun":"Sun"},
    vsLabel:"vs", rankOne:"#1", degreeC:"°C", addPrefix:"+ ", updatedTime:"6:30 AM",
    zeroKm:"0 km", changeState:"Change state",
    langHindi:"Hindi", langTelugu:"Telugu", langTamil:"Tamil",
    yourDistrict:"Your District",
    states:{"Andhra Pradesh":"Andhra Pradesh","Telangana":"Telangana","Tamil Nadu":"Tamil Nadu","Karnataka":"Karnataka","Maharashtra":"Maharashtra","Uttar Pradesh":"Uttar Pradesh","Punjab":"Punjab","Madhya Pradesh":"Madhya Pradesh","Rajasthan":"Rajasthan","Gujarat":"Gujarat","Bihar":"Bihar","Haryana":"Haryana","Odisha":"Odisha","West Bengal":"West Bengal","Assam":"Assam","Jharkhand":"Jharkhand","Chhattisgarh":"Chhattisgarh","Uttarakhand":"Uttarakhand","Himachal Pradesh":"Himachal Pradesh","Kerala":"Kerala","Goa":"Goa","Manipur":"Manipur","Meghalaya":"Meghalaya","Tripura":"Tripura","Nagaland":"Nagaland","Mizoram":"Mizoram","Arunachal Pradesh":"Arunachal Pradesh","Sikkim":"Sikkim","Jammu & Kashmir":"Jammu & Kashmir","Ladakh":"Ladakh","Delhi":"Delhi","Puducherry":"Puducherry"},
  },
  hi: {
    appName:"क्रॉपमार्केट", tagline:"स्मार्ट खेती निर्णय",
    home:"होम", markets:"बाजार", watch:"वॉच", tools:"उपकरण", trip:"यात्रा",
    chooseLanguage:"अपनी भाषा चुनें", selectDistrict:"अपना जिला चुनें",
    autoDetect:"स्थान ढूंढें", detecting:"खोज रहे हैं...", detected:"स्थान मिला",
    orSearch:"या नीचे खोजें",
    selectState:"राज्य चुनें",
    searchState:"राज्य खोजें...",
    searchDistrict:"जिला खोजें...",
    confirmDistrict:"जिला चुनें", continueBtn:"जारी रखें", back:"वापस",
    district:"जिला",
    sellNow:"अभी बेचें", wait:"रुकें",
    reasonSell:"अधिक आवक या गिरती कीमत — जल्दी बेचें।",
    reasonWait:"कम आवक + बढ़ती कीमत — कुछ दिन रुकें।",
    reasonRain:"2 दिन में भारी बारिश — जल्दी बेचें।",
    todayPrice:"आज का भाव", sevenDay:"7 दिन का रुझान",
    trendRising:"बढ़ रहा", trendFalling:"घट रहा", trendStable:"स्थिर",
    LOW:"कम आवक", NORMAL:"सामान्य आवक", HIGH:"अधिक आवक",
    nearbyMarkets:"पास के बाजार", seeAll:"सभी देखें",
    harvestRisk:"फसल जोखिम चेतावनी", harvestRiskSub:"भारी बारिश संभव। अभी बेचें।",
    updatedToday:"आज अपडेट", bestToday:"सबसे अच्छा",
    listening:"सुन रहे हैं...", notHeard:"फसल नहीं पहचानी, फिर कोशिश करें।",
    tripCalc:"यात्रा लागत कैलकुलेटर",
    quantity:"मात्रा (क्विंटल)", vehicle:"वाहन", petrolPrice:"पेट्रोल (रु/लीटर)",
    laborDays:"मजदूरी दिन", dailyWage:"दैनिक मजदूरी (रु)",
    fuelCost:"ईंधन लागत", laborCost:"मजदूरी लागत",
    totalCost:"कुल यात्रा लागत", revenue:"आमदनी", netProfit:"शुद्ध लाभ",
    goGo:"जाना सही है", noGo:"जाना फायदेमंद नहीं",
    bestMarket:"सबसे अच्छा बाजार", compareAll:"सभी बाजारों की तुलना",
    bike:"दोपहिया", autoV:"ऑटो", car:"कार/जीप", truck:"ट्रैक्टर",
    localSell:"यहीं बेचें (बिना यात्रा)",
    aboveMSP:"MSP से ऊपर", nearMSP:"MSP के पास", belowMSP:"MSP से नीचे",
    weather:"मौसम", today:"आज", tomorrow:"कल",
    storageAdvisory:"भंडारण सलाह",
    schemes:"योजनाएं", msp:"MSP", storage:"भंडारण", convert:"यूनिट", calendar:"कैलेंडर",
    min:"न्यूनतम", max:"अधिकतम", modal:"मॉडल", searchCrop:"फसल खोजें...",
    perQtl:"/क्विंटल", add:"जोड़ें", setAlert:"अलर्ट सेट", addAlert:"नया अलर्ट",
    notifyAbove:"ऊपर जाने पर सूचित", notifyBelow:"नीचे जाने पर सूचित",
    watchlist:"वॉचलिस्ट", alerts:"मूल्य अलर्ट",
    noWatchlist:"वॉचलिस्ट खाली है।", noAlerts:"कोई अलर्ट नहीं।",
    allCrops:"सभी फसलें", tip:"सुझाव", shelfLife:"शेल्फ जीवन",
    moistureRisk:"नमी जोखिम", storageDays:"भंडारण दिन",
    enterArea:"क्षेत्रफल दर्ज करें", selectUnit:"यूनिट चुनें:", quickRef:"त्वरित संदर्भ",
    sow:"बुआई का मौसम", harvest:"कटाई का मौसम", bestSell:"बेचने का सही समय",
    cropCalendar:"फसल कैलेंडर", voiceHint:"आवाज़ खोज Chrome/Android पर बेहतर काम करती है",
    voiceRecognised:"पहचाना गया",
    kmUnit:"किमी", qtlUnit:"क्विंटल",
    marketAPMC:"APMC मंडी", marketSubMandi:" उप-मंडी",
    marketRegional:"क्षेत्रीय बाजार", marketStateHub:"राज्य APMC हब",
    moisture:"नमी जोखिम",
    moistureHighRisk:"अधिक खतरा", moistureLowRisk:"कम खतरा", moistureMedium:"मध्यम",
    unitGuntha:"गुंठा", unitAcre:"एकड़", unitBigha:"बीघा", unitCent:"सेंट",
    ref1a:"1 एकड़", ref1b:"= 40 गुंठा = 100 सेंट",
    ref2a:"1 हेक्टेयर", ref2b:"= 2.47 एकड़",
    ref3a:"1 बीघा (AP/तेलंगाना)", ref3b:"≈ 0.62 एकड़",
    ref4a:"1 गुंठा", ref4b:"= 121 वर्ग गज",
    filterCrop:"फसल से फिल्टर करें",
    dayPrefix:"दिन",
    cropLabel:"फसल", typeLabel:"प्रकार", priceLabel:"मूल्य (रु/क्विंटल)", cancelBtn:"रद्द करें",
    gross:"सकल", netAfterCosts:"यात्रा लागत के बाद लाभ",
    convertTo:"→ एकड़ + हेक्टेयर", acresUnit:"एकड़", hectaresUnit:"हेक्टेयर",
    daysUnit:"दिन", mspVsMarket:"MSP बनाम बाजार", marketLabel:"बाजार",
    qtlX:"क्विंटल ×", qtlPh:"क्विंटल", areaPh:"उदा. 5", pricePh:"उदा. 2000",
    highBadge:"उच्च", lowBadge:"निम्न",
    days:{"Mon":"सोम","Tue":"मंगल","Wed":"बुध","Thu":"गुरु","Fri":"शुक्र","Sat":"शनि","Sun":"रवि"},
    shelfLabel:"शेल्फ जीवन",
    changeState:"राज्य बदलें", yourDistrict:"आपका जिला",
    vsLabel:"बनाम",
    zeroKm:"0 किमी",
    langHindi:"हिंदी", langTelugu:"తెలుగు", langTamil:"தமிழ்",
    rankOne:"#1", degreeC:"°C",
    addPrefix:"+ ",
    updatedTime:"6:30 सुबह",
    states:{"Andhra Pradesh":"आंध्र प्रदेश","Telangana":"तेलंगाना","Tamil Nadu":"तमिल नाडु","Karnataka":"कर्नाटक","Maharashtra":"महाराष्ट्र","Uttar Pradesh":"उत्तर प्रदेश","Punjab":"पंजाब","Madhya Pradesh":"मध्य प्रदेश","Rajasthan":"राजस्थान","Gujarat":"गुजरात","Bihar":"बिहार","Haryana":"हरियाणा","Odisha":"ओडिशा","West Bengal":"पश्चिम बंगाल","Assam":"असम","Jharkhand":"झारखंड","Chhattisgarh":"छत्तीसगढ़","Uttarakhand":"उत्तराखंड","Himachal Pradesh":"हिमाचल प्रदेश","Kerala":"केरल","Goa":"गोआ","Manipur":"मणिपुर","Meghalaya":"मेघालय","Tripura":"त्रिपुरा","Nagaland":"नागालैंड","Mizoram":"मिजोरम","Arunachal Pradesh":"अरुणाचल प्रदेश","Sikkim":"सिक्किम","Jammu & Kashmir":"जम्मू और कश्मीर","Ladakh":"लद्दाख","Delhi":"दिल्ली","Puducherry":"पुडुचेरी"},
  },
  te: {
    appName:"క్రాప్మార్కెట్", tagline:"స్మార్ట్ వ్యవసాయ నిర్ణయాలు",
    home:"హోమ్", markets:"మార్కెట్లు", watch:"వాచ్", tools:"సాధనాలు", trip:"ప్రయాణం",
    chooseLanguage:"మీ భాషను ఎంచుకోండి", selectDistrict:"మీ జిల్లాను ఎంచుకోండి",
    autoDetect:"స్థానాన్ని గుర్తించు", detecting:"గుర్తిస్తోంది...", detected:"స్థానం దొరికింది",
    orSearch:"లేదా క్రింద వెతకండి",
    selectState:"రాష్ట్రాన్ని ఎంచుకోండి",
    searchState:"రాష్ట్రాన్ని వెతకండి...",
    searchDistrict:"జిల్లాను వెతకండి...",
    confirmDistrict:"జిల్లా నిర్ధారించండి", continueBtn:"కొనసాగించు", back:"వెనక్కి",
    district:"జిల్లా",
    sellNow:"ఇప్పుడు అమ్మండి", wait:"వేచి ఉండండి",
    reasonSell:"అధిక రాక లేదా తగ్గుతున్న ధర — త్వరగా అమ్మండి.",
    reasonWait:"తక్కువ రాక + పెరుగుతున్న ధర — కొంత కాలం వేచి ఉండండి.",
    reasonRain:"2 రోజుల్లో భారీ వర్షం — వెంటనే అమ్మండి.",
    todayPrice:"నేటి ధర పరిధి", sevenDay:"7 రోజుల ధోరణి",
    trendRising:"పెరుగుతోంది", trendFalling:"తగ్గుతోంది", trendStable:"స్థిరంగా ఉంది",
    LOW:"తక్కువ రాక", NORMAL:"సాధారణ రాక", HIGH:"అధిక రాక",
    nearbyMarkets:"సమీప మార్కెట్లు", seeAll:"అన్నీ చూడండి",
    harvestRisk:"పంట ప్రమాద హెచ్చరిక", harvestRiskSub:"భారీ వర్షం సూచన. వెంటనే అమ్మండి.",
    updatedToday:"నేడు నవీకరించబడింది", bestToday:"ఉత్తమం",
    listening:"వింటోంది...", notHeard:"పంట గుర్తించబడలేదు, మళ్ళీ ప్రయత్నించండి.",
    tripCalc:"ప్రయాణ వ్యయ లెక్కింపు",
    quantity:"పరిమాణం (క్వింటాళ్లు)", vehicle:"వాహనం", petrolPrice:"పెట్రోల్ (రూ/లీ)",
    laborDays:"కూలీ రోజులు", dailyWage:"రోజు కూలీ (రూ)",
    fuelCost:"ఇంధన వ్యయం", laborCost:"కూలీ వ్యయం",
    totalCost:"మొత్తం ప్రయాణ వ్యయం", revenue:"ఆశించిన ఆదాయం", netProfit:"నికర లాభం",
    goGo:"వెళ్ళడం విలువైనది", noGo:"వెళ్ళడం లాభదాయకం కాదు",
    bestMarket:"ఉత్తమ మార్కెట్", compareAll:"అన్ని మార్కెట్లను పోల్చండి",
    bike:"2 చక్రాల వాహనం", autoV:"ఆటో", car:"కారు/జీప్", truck:"ట్రాక్టర్",
    localSell:"స్థానికంగా అమ్మండి",
    aboveMSP:"MSP కంటే ఎక్కువ", nearMSP:"MSP సమీపంలో", belowMSP:"MSP కంటే తక్కువ",
    weather:"వాతావరణం", today:"నేడు", tomorrow:"రేపు",
    storageAdvisory:"నిల్వ సలహా",
    schemes:"పథకాలు", msp:"MSP", storage:"నిల్వ", convert:"యూనిట్", calendar:"క్యాలెండర్",
    min:"కనిష్ట", max:"గరిష్ట", modal:"మోడల్", searchCrop:"పంట వెతకండి...",
    perQtl:"/క్వింటల్", add:"జోడించు", setAlert:"హెచ్చరిక సెట్", addAlert:"కొత్త హెచ్చరిక",
    notifyAbove:"పైన తెలియజేయి", notifyBelow:"కింద తెలియజేయి",
    watchlist:"వాచ్లిస్ట్", alerts:"ధర హెచ్చరికలు",
    noWatchlist:"వాచ్లిస్ట్లో పంటలు లేవు.", noAlerts:"హెచ్చరికలు లేవు.",
    allCrops:"అన్ని పంటలు", tip:"చిట్కా", shelfLife:"నిల్వ కాలం",
    moistureRisk:"తేమ ప్రమాదం", storageDays:"నిల్వ రోజులు",
    enterArea:"విస్తీర్ణం నమోదు చేయండి", selectUnit:"యూనిట్ ఎంచుకోండి:", quickRef:"శీఘ్ర సూచన",
    sow:"విత్తన కాలం", harvest:"కోత కాలం", bestSell:"అమ్మడానికి సరైన సమయం",
    cropCalendar:"పంట క్యాలెండర్", voiceHint:"వాయిస్ Chrome/Android లో బాగా పనిచేస్తుంది",
    voiceRecognised:"గుర్తించబడింది",
    kmUnit:"కి.మీ", qtlUnit:"క్వింటల్",
    marketAPMC:"APMC మార్కెట్", marketSubMandi:" సబ్-మండి",
    marketRegional:"ప్రాంతీయ మార్కెట్", marketStateHub:"రాష్ట్ర APMC కేంద్రం",
    moisture:"తేమ ప్రమాదం",
    moistureHighRisk:"అధిక ప్రమాదం", moistureLowRisk:"తక్కువ ప్రమాదం", moistureMedium:"మధ్యస్థం",
    unitGuntha:"గుంట", unitAcre:"ఎకరం", unitBigha:"బీఘా", unitCent:"సెంట్",
    ref1a:"1 ఎకరం", ref1b:"= 40 గుంట = 100 సెంట్",
    ref2a:"1 హెక్టారు", ref2b:"= 2.47 ఎకరాలు",
    ref3a:"1 బీఘా (AP/తెలంగాణ)", ref3b:"≈ 0.62 ఎకరాలు",
    ref4a:"1 గుంట", ref4b:"= 121 చ.గజాలు",
    filterCrop:"పంట ద్వారా వడపోయండి",
    dayPrefix:"రోజు",
    cropLabel:"పంట", typeLabel:"రకం", priceLabel:"ధర (రూ/క్వింటల్)", cancelBtn:"రద్దు చేయి",
    gross:"స్థూల", netAfterCosts:"ప్రయాణ ఖర్చుల తర్వాత లాభం",
    convertTo:"→ ఎకరాలు + హెక్టార్లు", acresUnit:"ఎకరాలు", hectaresUnit:"హెక్టార్లు",
    daysUnit:"రోజులు", mspVsMarket:"MSP వర్సెస్ మార్కెట్", marketLabel:"మార్కెట్",
    qtlX:"క్వింటాల్ ×", qtlPh:"క్వింటాళ్లు", areaPh:"ఉదా. 5", pricePh:"ఉదా. 2000",
    highBadge:"అధిక", lowBadge:"తక్కువ",
    days:{"Mon":"సోమ","Tue":"మంగళ","Wed":"బుధ","Thu":"గురు","Fri":"శుక్ర","Sat":"శని","Sun":"ఆది"},
    shelfLabel:"నిల్వ కాలం",
    changeState:"రాష్ట్రం మార్చు", yourDistrict:"మీ జిల్లా",
    vsLabel:"వర్సెస్",
    zeroKm:"0 కి.మీ",
    langHindi:"हिंदी", langTelugu:"తెలుగు", langTamil:"தமிழ்",
    rankOne:"#1", degreeC:"°C",
    addPrefix:"+ ",
    updatedTime:"6:30 AM",
    states:{"Andhra Pradesh":"ఆంధ్ర ప్రదేశ్","Telangana":"తెలంగాణ","Tamil Nadu":"తమిళనాడు","Karnataka":"కర్ణాటక","Maharashtra":"మహారాష్ట్ర","Uttar Pradesh":"ఉత్తర ప్రదేశ్","Punjab":"పంజాబ్","Madhya Pradesh":"మధ్య ప్రదేశ్","Rajasthan":"రాజస్థాన్","Gujarat":"గుజరాత్","Bihar":"బీహార్","Haryana":"హర్యానా","Odisha":"ఒడిశా","West Bengal":"పశ్చిమ బెంగాల్","Assam":"అసోం","Jharkhand":"జార్ఖండ్","Chhattisgarh":"ఛత్తీస్‌గఢ్","Uttarakhand":"ఉత్తరాఖండ్","Himachal Pradesh":"హిమాచల్ ప్రదేశ్","Kerala":"కేరళ","Goa":"గోవా","Manipur":"మణిపూర్","Meghalaya":"మేఘాలయ","Tripura":"త్రిపుర","Nagaland":"నాగాలాండ్","Mizoram":"మిజోరం","Arunachal Pradesh":"అరుణాచల్ ప్రదేశ్","Sikkim":"సిక్కిం","Jammu & Kashmir":"జమ్మూ కాశ్మీర్","Ladakh":"లదాఖ్","Delhi":"ఢిల్లీ","Puducherry":"పుడుచేరి"},
  },
  ta: {
    appName:"க்ராப்மார்க்கெட்", tagline:"புத்திசாலி விவசாய முடிவுகள்",
    home:"முகப்பு", markets:"சந்தைகள்", watch:"கண்காணிப்பு", tools:"கருவிகள்", trip:"பயணம்",
    chooseLanguage:"உங்கள் மொழியை தேர்ந்தெடுக்கவும்", selectDistrict:"உங்கள் மாவட்டத்தை தேர்ந்தெடுக்கவும்",
    autoDetect:"என் இருப்பிடம் கண்டறி", detecting:"கண்டறிகிறது...", detected:"இருப்பிடம் கிடைத்தது",
    orSearch:"அல்லது கீழே தேடுங்கள்",
    selectState:"மாநிலம் தேர்ந்தெடுக்கவும்",
    searchState:"மாநிலம் தேடு...",
    searchDistrict:"மாவட்டம் தேடு...",
    confirmDistrict:"மாவட்டம் உறுதிப்படுத்து", continueBtn:"தொடரவும்", back:"மீண்டும்",
    district:"மாவட்டம்",
    sellNow:"இப்போது விற்கவும்", wait:"காத்திருங்கள்",
    reasonSell:"அதிக வரவு அல்லது குறையும் விலை — விரைவாக விற்கவும்.",
    reasonWait:"குறைந்த வரவு + உயரும் விலை — சில நாட்கள் காத்திருங்கள்.",
    reasonRain:"2 நாட்களில் கனமழை — விரைவாக விற்கவும்.",
    todayPrice:"இன்றைய விலை", sevenDay:"7 நாள் போக்கு",
    trendRising:"உயர்கிறது", trendFalling:"குறைகிறது", trendStable:"நிலையானது",
    LOW:"குறைந்த வரவு", NORMAL:"சாதாரண வரவு", HIGH:"அதிக வரவு",
    nearbyMarkets:"அருகிலுள்ள சந்தைகள்", seeAll:"அனைத்தும் காண",
    harvestRisk:"அறுவடை ஆபத்து எச்சரிக்கை", harvestRiskSub:"கனமழை வாய்ப்பு. இப்போதே விற்கவும்.",
    updatedToday:"இன்று புதுப்பிக்கப்பட்டது", bestToday:"சிறந்தது",
    listening:"கேட்கிறது...", notHeard:"பயிர் அங்கீகரிக்கப்படவில்லை.",
    tripCalc:"பயண செலவு கணக்கீடு",
    quantity:"அளவு (குவிண்டால்)", vehicle:"வாகனம்", petrolPrice:"பெட்ரோல் (ரூ/லி)",
    laborDays:"கூலி நாட்கள்", dailyWage:"தினக் கூலி (ரூ)",
    fuelCost:"எரிபொருள் செலவு", laborCost:"கூலி செலவு",
    totalCost:"மொத்த பயண செலவு", revenue:"எதிர்பார்க்கப்படும் வருவாய்", netProfit:"நிகர லாபம்",
    goGo:"பயணம் மதிப்பானது", noGo:"பயணம் லாபகரமல்ல",
    bestMarket:"சிறந்த சந்தை", compareAll:"அனைத்து சந்தைகளையும் ஒப்பிடு",
    bike:"இரு சக்கர வாகனம்", autoV:"ஆட்டோ", car:"கார்/ஜீப்", truck:"டிராக்டர்",
    localSell:"உள்ளூரில் விற்கவும்",
    aboveMSP:"MSP-க்கு மேல்", nearMSP:"MSP அருகில்", belowMSP:"MSP-க்கு கீழ்",
    weather:"வானிலை", today:"இன்று", tomorrow:"நாளை",
    storageAdvisory:"சேமிப்பு ஆலோசனை",
    schemes:"திட்டங்கள்", msp:"MSP", storage:"சேமிப்பு", convert:"அலகு", calendar:"நாட்காட்டி",
    min:"குறைந்தபட்சம்", max:"அதிகபட்சம்", modal:"மோடல்", searchCrop:"பயிர் தேடு...",
    perQtl:"/குவிண்டால்", add:"சேர்", setAlert:"எச்சரிக்கை அமை", addAlert:"புதிய எச்சரிக்கை",
    notifyAbove:"மேலே தெரிவி", notifyBelow:"கீழே தெரிவி",
    watchlist:"கண்காணிப்பு பட்டியல்", alerts:"விலை எச்சரிக்கைகள்",
    noWatchlist:"பட்டியலில் பயிர்கள் இல்லை.", noAlerts:"எச்சரிக்கைகள் இல்லை.",
    allCrops:"அனைத்து பயிர்கள்", tip:"குறிப்பு", shelfLife:"சேமிப்பு காலம்",
    moistureRisk:"ஈரப்பத ஆபத்து", storageDays:"சேமிப்பு நாட்கள்",
    enterArea:"பரப்பை உள்ளிடவும்", selectUnit:"அலகு தேர்ந்தெடு:", quickRef:"விரைவு குறிப்பு",
    sow:"விதைப்பு காலம்", harvest:"அறுவடை காலம்", bestSell:"விற்க சிறந்த நேரம்",
    cropCalendar:"பயிர் நாட்காட்டி", voiceHint:"குரல் தேடல் Chrome/Android-ல் சிறப்பாக செயல்படும்",
    voiceRecognised:"அங்கீகரிக்கப்பட்டது",
    kmUnit:"கி.மீ", qtlUnit:"குவிண்டால்",
    marketAPMC:"APMC சந்தை", marketSubMandi:" துணை சந்தை",
    marketRegional:"பிராந்திய சந்தை", marketStateHub:"மாநில APMC மையம்",
    moisture:"ஈரப்பத ஆபத்து",
    moistureHighRisk:"அதிக ஆபத்து", moistureLowRisk:"குறைந்த ஆபத்து", moistureMedium:"நடுத்தரம்",
    unitGuntha:"குண்டா", unitAcre:"ஏக்கர்", unitBigha:"பிகா", unitCent:"சென்ட்",
    ref1a:"1 ஏக்கர்", ref1b:"= 40 குண்டா = 100 சென்ட்",
    ref2a:"1 ஹெக்டேர்", ref2b:"= 2.47 ஏக்கர்",
    ref3a:"1 பிகா (AP/தெலங்கானா)", ref3b:"≈ 0.62 ஏக்கர்",
    ref4a:"1 குண்டா", ref4b:"= 121 சதுர கஜம்",
    filterCrop:"பயிர் மூலம் வடிகட்டு",
    dayPrefix:"நாள்",
    cropLabel:"பயிர்", typeLabel:"வகை", priceLabel:"விலை (ரூ/குவிண்டால்)", cancelBtn:"ரத்து செய்",
    gross:"மொத்தம்", netAfterCosts:"பயண செலவுக்கு பிறகு லாபம்",
    convertTo:"→ ஏக்கர் + ஹெக்டேர்", acresUnit:"ஏக்கர்", hectaresUnit:"ஹெக்டேர்",
    daysUnit:"நாட்கள்", mspVsMarket:"MSP எதிர் சந்தை", marketLabel:"சந்தை",
    qtlX:"குவிண்டால் ×", qtlPh:"குவிண்டால்", areaPh:"எ.கா. 5", pricePh:"எ.கா. 2000",
    highBadge:"அதிக", lowBadge:"குறைந்த",
    days:{"Mon":"திங்கள்","Tue":"செவ்வாய்","Wed":"புதன்","Thu":"வியாழன்","Fri":"வெள்ளி","Sat":"சனி","Sun":"ஞாயிறு"},
    shelfLabel:"சேமிப்பு காலம்",
    changeState:"மாநிலம் மாற்று", yourDistrict:"உங்கள் மாவட்டம்",
    vsLabel:"எதிர்",
    zeroKm:"0 கி.மீ",
    langHindi:"हिंदी", langTelugu:"తెలుగు", langTamil:"தமிழ்",
    rankOne:"#1", degreeC:"°C",
    addPrefix:"+ ",
    updatedTime:"6:30 காலை",
    states:{"Andhra Pradesh":"ஆந்திர பிரதேசம்","Telangana":"தெலங்கானா","Tamil Nadu":"தமிழ்நாடு","Karnataka":"கர்நாடகா","Maharashtra":"மகாராஷ்டிரா","Uttar Pradesh":"உத்தரப் பிரதேசம்","Punjab":"பஞ்சாப்","Madhya Pradesh":"மத்திய பிரதேசம்","Rajasthan":"ராஜஸ்தான்","Gujarat":"குஜராத்","Bihar":"பீஹார்","Haryana":"ஹரியானா","Odisha":"ஒடிசா","West Bengal":"மேற்கு வங்காளம்","Assam":"அசாம்","Jharkhand":"ஜார்க்கண்ட்","Chhattisgarh":"சத்தீஸ்கர்","Uttarakhand":"உத்தரகாண்ட்","Himachal Pradesh":"இமாசல பிரதேசம்","Kerala":"கேரளா","Goa":"கோவா","Manipur":"மணிப்பூர்","Meghalaya":"மேகாலயா","Tripura":"திரிபுரா","Nagaland":"நாகாலாந்து","Mizoram":"மிசோரம்","Arunachal Pradesh":"அருணாசல பிரதேசம்","Sikkim":"சிக்கிம்","Jammu & Kashmir":"ஜம்மு காஷ்மீர்","Ladakh":"லடாக்","Delhi":"தில்லி","Puducherry":"புதுச்சேரி"},
  },
};

const LANG_CODES  = { en:"en-IN", hi:"hi-IN", te:"te-IN", ta:"ta-IN" };
const LANG_LABELS = { en:"English", hi:"हिंदी", te:"తెలుగు", ta:"தமிழ்" };

const CROPS = ["Tomato","Onion","Potato","Rice","Wheat","Maize","Cotton","Groundnut","Chilli","Soybean","Garlic","Ginger","Brinjal","Banana","Mustard"];
const CROP_NATIVE = {
  hi:{Tomato:"टमाटर",Onion:"प्याज",Rice:"चावल",Wheat:"गेहूं",Maize:"मक्का",Cotton:"कपास",Groundnut:"मूंगफली",Chilli:"मिर्च",Potato:"आलू",Soybean:"सोयाबीन",Garlic:"लहसुन",Ginger:"अदरक",Brinjal:"बैंगन",Banana:"केला",Mustard:"सरसों"},
  te:{Tomato:"టమాటో",Onion:"ఉల్లిపాయ",Rice:"వరి",Wheat:"గోధుమ",Maize:"మొక్కజొన్న",Cotton:"పత్తి",Groundnut:"వేరుసెనగ",Chilli:"మిర్చి",Potato:"బంగాళాదుంప",Soybean:"సోయాబీన్",Garlic:"వెల్లుల్లి",Ginger:"అల్లం",Brinjal:"వంకాయ",Banana:"అరటి",Mustard:"ఆవాలు"},
  ta:{Tomato:"தக்காளி",Onion:"வெங்காயம்",Rice:"அரிசி",Wheat:"கோதுமை",Maize:"மக்காச்சோளம்",Cotton:"பருத்தி",Groundnut:"கடலை",Chilli:"மிளகாய்",Potato:"உருளைக்கிழங்கு",Soybean:"சோயா",Garlic:"பூண்டு",Ginger:"இஞ்சி",Brinjal:"கத்திரிக்காய்",Banana:"வாழைப்பழம்",Mustard:"கடுகு"},
};
const getCropName = (crop, lang) => (CROP_NATIVE[lang] && CROP_NATIVE[lang][crop]) || crop;

const DISTRICTS_BY_STATE = {
  "Andhra Pradesh":["Anantapur","Bapatla","Chittoor","East Godavari","Eluru","Guntur","Kadapa","Kakinada","Konaseema","Krishna","Kurnool","Nandyal","Nellore","NTR","Palnadu","Prakasam","Sri Potti Sriramulu Nellore","Srikakulam","Tirupati","Visakhapatnam","Vizianagaram","West Godavari"],
  "Telangana":["Adilabad","Bhadradri Kothagudem","Hanumakonda","Hyderabad","Jagtial","Jangaon","Jayashankar Bhupalpally","Jogulamba Gadwal","Kamareddy","Karimnagar","Khammam","Kumuram Bheem","Mahabubabad","Mahabubnagar","Mancherial","Medak","Medchal Malkajgiri","Mulugu","Nagarkurnool","Nalgonda","Narayanpet","Nirmal","Nizamabad","Peddapalli","Rajanna Sircilla","Rangareddy","Sangareddy","Siddipet","Suryapet","Vikarabad","Wanaparthy","Warangal","Yadadri Bhuvanagiri"],
  "Tamil Nadu":["Ariyalur","Chengalpattu","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode","Kallakurichi","Kancheepuram","Kanniyakumari","Karur","Krishnagiri","Madurai","Mayiladuthurai","Nagapattinam","Namakkal","Perambalur","Pudukkottai","Ramanathapuram","Ranipet","Salem","Sivaganga","Tenkasi","Thanjavur","Theni","Thoothukudi","Tiruchirappalli","Tirunelveli","Tirupathur","Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur","Vellore","Viluppuram","Virudhunagar"],
  "Karnataka":["Bagalkote","Ballari","Belagavi","Bengaluru Rural","Bengaluru Urban","Bidar","Chamarajanagar","Chikkaballapura","Chikkamagaluru","Chitradurga","Dakshina Kannada","Davanagere","Dharwad","Gadag","Hassan","Haveri","Kalaburagi","Kodagu","Kolar","Koppal","Mandya","Mysuru","Raichur","Ramanagara","Shivamogga","Tumakuru","Udupi","Uttara Kannada","Vijayapura","Yadgir"],
  "Maharashtra":["Ahmednagar","Akola","Amravati","Aurangabad","Beed","Bhandara","Buldhana","Chandrapur","Dhule","Gadchiroli","Gondia","Hingoli","Jalgaon","Jalna","Kolhapur","Latur","Mumbai City","Mumbai Suburban","Nagpur","Nanded","Nandurbar","Nashik","Osmanabad","Palghar","Parbhani","Pune","Raigad","Ratnagiri","Sangli","Satara","Sindhudurg","Solapur","Thane","Wardha","Washim","Yavatmal"],
  "Uttar Pradesh":["Agra","Aligarh","Allahabad","Ambedkar Nagar","Amethi","Amroha","Auraiya","Ayodhya","Azamgarh","Baghpat","Bahraich","Ballia","Balrampur","Banda","Barabanki","Bareilly","Basti","Bijnor","Budaun","Bulandshahr","Chandauli","Chitrakoot","Deoria","Etah","Etawah","Farrukhabad","Fatehpur","Firozabad","Gautam Buddha Nagar","Ghaziabad","Ghazipur","Gonda","Gorakhpur","Hamirpur","Hapur","Hardoi","Hathras","Jalaun","Jaunpur","Jhansi","Kannauj","Kanpur Dehat","Kanpur Nagar","Kasganj","Kaushambi","Kushinagar","Lakhimpur Kheri","Lalitpur","Lucknow","Maharajganj","Mahoba","Mainpuri","Mathura","Mau","Meerut","Mirzapur","Moradabad","Muzaffarnagar","Pilibhit","Pratapgarh","Raebareli","Rampur","Saharanpur","Sambhal","Sant Kabir Nagar","Shahjahanpur","Shamli","Shrawasti","Siddharthnagar","Sitapur","Sonbhadra","Sultanpur","Unnao","Varanasi"],
  "Punjab":["Amritsar","Barnala","Bathinda","Faridkot","Fatehgarh Sahib","Fazilka","Ferozepur","Gurdaspur","Hoshiarpur","Jalandhar","Kapurthala","Ludhiana","Malerkotla","Mansa","Moga","Mohali","Muktsar","Nawanshahr","Pathankot","Patiala","Rupnagar","Sangrur","Tarn Taran"],
  "Madhya Pradesh":["Agar Malwa","Alirajpur","Anuppur","Ashoknagar","Balaghat","Barwani","Betul","Bhind","Bhopal","Burhanpur","Chhatarpur","Chhindwara","Damoh","Datia","Dewas","Dhar","Dindori","Guna","Gwalior","Harda","Hoshangabad","Indore","Jabalpur","Jhabua","Katni","Khandwa","Khargone","Mandla","Mandsaur","Morena","Narsinghpur","Neemuch","Niwari","Panna","Raisen","Rajgarh","Ratlam","Rewa","Sagar","Satna","Sehore","Seoni","Shahdol","Shajapur","Sheopur","Shivpuri","Sidhi","Singrauli","Tikamgarh","Ujjain","Umaria","Vidisha"],
  "Rajasthan":["Ajmer","Alwar","Banswara","Baran","Barmer","Bharatpur","Bhilwara","Bikaner","Bundi","Chittorgarh","Churu","Dausa","Dholpur","Dungarpur","Ganganagar","Hanumangarh","Jaipur","Jaisalmer","Jalore","Jhalawar","Jhunjhunu","Jodhpur","Karauli","Kota","Nagaur","Pali","Pratapgarh","Rajsamand","Sawai Madhopur","Sikar","Sirohi","Tonk","Udaipur"],
  "Gujarat":["Ahmedabad","Amreli","Anand","Aravalli","Banaskantha","Bharuch","Bhavnagar","Botad","Chhota Udaipur","Dahod","Dang","Devbhoomi Dwarka","Gandhinagar","Gir Somnath","Jamnagar","Junagadh","Kheda","Kutch","Mahisagar","Mehsana","Morbi","Narmada","Navsari","Panchmahal","Patan","Porbandar","Rajkot","Sabarkantha","Surat","Surendranagar","Tapi","Vadodara","Valsad"],
  "Bihar":["Araria","Arwal","Aurangabad","Banka","Begusarai","Bhagalpur","Bhojpur","Buxar","Darbhanga","East Champaran","Gaya","Gopalganj","Jamui","Jehanabad","Kaimur","Katihar","Khagaria","Kishanganj","Lakhisarai","Madhepura","Madhubani","Munger","Muzaffarpur","Nalanda","Nawada","Patna","Purnia","Rohtas","Saharsa","Samastipur","Saran","Sheikhpura","Sheohar","Sitamarhi","Siwan","Supaul","Vaishali","West Champaran"],
  "Haryana":["Ambala","Bhiwani","Charkhi Dadri","Faridabad","Fatehabad","Gurugram","Hisar","Jhajjar","Jind","Kaithal","Karnal","Kurukshetra","Mahendragarh","Nuh","Palwal","Panchkula","Panipat","Rewari","Rohtak","Sirsa","Sonipat","Yamunanagar"],
  "Odisha":["Angul","Balangir","Balasore","Bargarh","Bhadrak","Boudh","Cuttack","Deogarh","Dhenkanal","Gajapati","Ganjam","Jagatsinghpur","Jajpur","Jharsuguda","Kalahandi","Kandhamal","Kendrapara","Kendujhar","Khordha","Koraput","Malkangiri","Mayurbhanj","Nabarangpur","Nayagarh","Nuapada","Puri","Rayagada","Sambalpur","Sonepur","Sundargarh"],
  "West Bengal":["Alipurduar","Bankura","Birbhum","Cooch Behar","Dakshin Dinajpur","Darjeeling","Hooghly","Howrah","Jalpaiguri","Jhargram","Kalimpong","Kolkata","Malda","Murshidabad","Nadia","North 24 Parganas","Paschim Bardhaman","Paschim Medinipur","Purba Bardhaman","Purba Medinipur","Purulia","South 24 Parganas","Uttar Dinajpur"],
  "Assam":["Bajali","Baksa","Barpeta","Biswanath","Bongaigaon","Cachar","Charaideo","Chirang","Darrang","Dhemaji","Dhubri","Dibrugarh","Dima Hasao","Goalpara","Golaghat","Hailakandi","Hojai","Jorhat","Kamrup Metropolitan","Kamrup","Karbi Anglong","Karimganj","Kokrajhar","Lakhimpur","Majuli","Morigaon","Nagaon","Nalbari","Sivasagar","Sonitpur","South Salmara-Mankachar","Tinsukia","Udalguri","West Karbi Anglong"],
  "Himachal Pradesh":["Bilaspur","Chamba","Hamirpur","Kangra","Kinnaur","Kullu","Lahaul Spiti","Mandi","Shimla","Sirmaur","Solan","Una"],
  "Uttarakhand":["Almora","Bageshwar","Chamoli","Champawat","Dehradun","Haridwar","Nainital","Pauri Garhwal","Pithoragarh","Rudraprayag","Tehri Garhwal","Udham Singh Nagar","Uttarkashi"],
  "Jharkhand":["Bokaro","Chatra","Deoghar","Dhanbad","Dumka","East Singhbhum","Garhwa","Giridih","Godda","Gumla","Hazaribagh","Jamtara","Khunti","Koderma","Latehar","Lohardaga","Pakur","Palamu","Ramgarh","Ranchi","Sahebganj","Seraikela Kharsawan","Simdega","West Singhbhum"],
  "Chhattisgarh":["Balod","Baloda Bazar","Balrampur","Bastar","Bemetara","Bijapur","Bilaspur","Dantewada","Dhamtari","Durg","Gariaband","Gaurela Pendra Marwahi","Janjgir Champa","Jashpur","Kabirdham","Kanker","Khairagarh","Kondagaon","Korba","Koriya","Mahasamund","Manendragarh","Mohla Manpur","Mungeli","Narayanpur","Raigarh","Raipur","Rajnandgaon","Sakti","Sarangarh Bilaigarh","Sukma","Surajpur","Surguja"],
  "Kerala":["Alappuzha","Ernakulam","Idukki","Kannur","Kasaragod","Kollam","Kottayam","Kozhikode","Malappuram","Palakkad","Pathanamthitta","Thiruvananthapuram","Thrissur","Wayanad"],
  "Goa":["North Goa","South Goa"],
  "Manipur":["Bishnupur","Chandel","Churachandpur","Imphal East","Imphal West","Jiribam","Kakching","Kamjong","Kangpokpi","Noney","Pherzawl","Senapati","Tamenglong","Tengnoupal","Thoubal","Ukhrul"],
  "Meghalaya":["East Garo Hills","East Jaintia Hills","East Khasi Hills","Eastern West Khasi Hills","North Garo Hills","Ri Bhoi","South Garo Hills","South West Garo Hills","South West Khasi Hills","West Garo Hills","West Jaintia Hills","West Khasi Hills"],
  "Tripura":["Dhalai","Gomati","Khowai","North Tripura","Sepahijala","Sipahijala","South Tripura","Unakoti","West Tripura"],
  "Nagaland":["Chumoukedima","Dimapur","Kiphire","Kohima","Longleng","Mokokchung","Mon","Niuland","Noklak","Peren","Phek","Shamator","Tseminyü","Tuensang","Wokha","Zunheboto"],
  "Mizoram":["Aizawl","Champhai","Hnahthial","Khawzawl","Kolasib","Lawngtlai","Lunglei","Mamit","Saiha","Saitual","Serchhip"],
  "Arunachal Pradesh":["Anjaw","Changlang","Dibang Valley","East Kameng","East Siang","Kamle","Kra Daadi","Kurung Kumey","Lepa Rada","Lohit","Longding","Lower Dibang Valley","Lower Siang","Lower Subansiri","Namsai","Pakke Kessang","Papum Pare","Shi Yomi","Siang","Tawang","Tirap","Upper Siang","Upper Subansiri","West Kameng","West Siang"],
  "Sikkim":["East Sikkim","North Sikkim","Pakyong","Soreng","South Sikkim","West Sikkim"],
  "Jammu & Kashmir":["Anantnag","Bandipora","Baramulla","Budgam","Doda","Ganderbal","Jammu","Kathua","Kishtwar","Kulgam","Kupwara","Poonch","Pulwama","Ramban","Reasi","Samba","Shopian","Srinagar","Udhampur"],
  "Ladakh":["Kargil","Leh"],
  "Delhi":["Central Delhi","East Delhi","New Delhi","North Delhi","North East Delhi","North West Delhi","Shahdara","South Delhi","South East Delhi","South West Delhi","West Delhi"],
  "Puducherry":["Karaikal","Mahe","Puducherry","Yanam"],
};


const DISTRICTS_NATIVE = {
  hi: {
    "Adilabad":"आदिलाबाद",
    "Agar Malwa":"आगर मालवा",
    "Agra":"आगरा",
    "Ahmedabad":"अहमदाबाद",
    "Ahmednagar":"अहमदनगर",
    "Aizawl":"आइजोल",
    "Ajmer":"अजमेर",
    "Akola":"अकोला",
    "Alappuzha":"अलाप्पुझा",
    "Aligarh":"अलीगढ़",
    "Alipurduar":"अलीपुरद्वार",
    "Alirajpur":"अलीराजपुर",
    "Allahabad":"इलाहाबाद",
    "Almora":"अल्मोड़ा",
    "Alwar":"अलवर",
    "Ambala":"अंबाला",
    "Ambedkar Nagar":"अंबेडकर नगर",
    "Amethi":"अमेठी",
    "Amravati":"अमरावती",
    "Amreli":"अमरेली",
    "Amritsar":"अमृतसर",
    "Amroha":"अमरोहा",
    "Anand":"आनंद",
    "Anantapur":"अनंतपुर",
    "Anantnag":"अनंतनाग",
    "Angul":"अनुगुल",
    "Anjaw":"अंजाव",
    "Anuppur":"अनूपुर",
    "Araria":"अररिया",
    "Aravalli":"अरावली",
    "Ariyalur":"अरियालुर",
    "Arwal":"अरवल",
    "Ashoknagar":"अशोकनगर",
    "Auraiya":"औरैया",
    "Aurangabad":"औरंगाबाद",
    "Ayodhya":"अयोध्या",
    "Azamgarh":"आजमगढ़",
    "Bagalkote":"बागलकोट",
    "Bageshwar":"बागेश्वर",
    "Baghpat":"बागपत",
    "Bahraich":"बहराइच",
    "Bajali":"बजाली",
    "Baksa":"बक्सा",
    "Balaghat":"बालाघाट",
    "Balangir":"बलांगीर",
    "Balasore":"बालासोर",
    "Ballari":"बल्लारी",
    "Ballia":"बलिया",
    "Balod":"बालोद",
    "Baloda Bazar":"बलौदा बाजार",
    "Balrampur":"बलरामपुर",
    "Banaskantha":"बनासकांठा",
    "Banda":"बांदा",
    "Bandipora":"बांदीपोरा",
    "Banka":"बांका",
    "Bankura":"बांकुड़ा",
    "Banswara":"बांसवाड़ा",
    "Bapatla":"बापटला",
    "Barabanki":"बाराबंकी",
    "Baramulla":"बारामुला",
    "Baran":"बारां",
    "Bareilly":"बरेली",
    "Bargarh":"बरगढ़",
    "Barmer":"बाड़मेर",
    "Barnala":"बरनाला",
    "Barpeta":"बारपेटा",
    "Barwani":"बड़वानी",
    "Bastar":"बस्तर",
    "Basti":"बस्ती",
    "Bathinda":"बठिंडा",
    "Beed":"बीड",
    "Begusarai":"बेगूसराय",
    "Belagavi":"बेलगावी",
    "Bemetara":"बेमेतरा",
    "Bengaluru Rural":"बेंगलुरु ग्रामीण",
    "Bengaluru Urban":"बेंगलुरु शहरी",
    "Betul":"बेतूल",
    "Bhadradri Kothagudem":"भद्राद्री कोठागुडेम",
    "Bhadrak":"भद्रक",
    "Bhagalpur":"भागलपुर",
    "Bhandara":"भंडारा",
    "Bharatpur":"भरतपुर",
    "Bharuch":"भरूच",
    "Bhavnagar":"भावनगर",
    "Bhilwara":"भीलवाड़ा",
    "Bhind":"भिंड",
    "Bhiwani":"भिवानी",
    "Bhojpur":"भोजपुर",
    "Bhopal":"भोपाल",
    "Bidar":"बीदर",
    "Bijapur":"बीजापुर",
    "Bijnor":"बिजनौर",
    "Bikaner":"बीकानेर",
    "Bilaspur":"बिलासपुर",
    "Birbhum":"बीरभूम",
    "Bishnupur":"बिष्णुपुर",
    "Biswanath":"बिश्वनाथ",
    "Bokaro":"बोकारो",
    "Bongaigaon":"बोंगाईगाव",
    "Botad":"बोटाड",
    "Boudh":"बोध",
    "Budaun":"बदायूं",
    "Budgam":"बडगाम",
    "Bulandshahr":"बुलंदशहर",
    "Buldhana":"बुलढाणा",
    "Bundi":"बूंदी",
    "Burhanpur":"बुरहानपुर",
    "Buxar":"बक्सर",
    "Cachar":"कछार",
    "Central Delhi":"मध्य दिल्ली",
    "Chamarajanagar":"चामराजनगर",
    "Chamba":"चंबा",
    "Chamoli":"चमोली",
    "Champawat":"चंपावत",
    "Champhai":"चंपाई",
    "Chandauli":"चंदौली",
    "Chandel":"चंदेल",
    "Chandrapur":"चंद्रपुर",
    "Changlang":"चांगलांग",
    "Charaideo":"चराईदेव",
    "Charkhi Dadri":"चरखी दादरी",
    "Chatra":"चतरा",
    "Chengalpattu":"चेंगलपट्टू",
    "Chennai":"चेन्नई",
    "Chhatarpur":"छतरपुर",
    "Chhindwara":"छिंदवाड़ा",
    "Chhota Udaipur":"छोटा उदयपुर",
    "Chikkaballapura":"चिक्कबल्लापुर",
    "Chikkamagaluru":"चिक्कमगलूरु",
    "Chirang":"चिरांग",
    "Chitradurga":"चित्रदुर्ग",
    "Chitrakoot":"चित्रकूट",
    "Chittoor":"चित्तूर",
    "Chittorgarh":"चित्तौड़गढ़",
    "Chumoukedima":"चुमौकेदिमा",
    "Churachandpur":"चुराचांदपुर",
    "Churu":"चुरू",
    "Coimbatore":"कोयंबटूर",
    "Cooch Behar":"कूच बिहार",
    "Cuddalore":"कड्डलोर",
    "Cuttack":"कटक",
    "Dahod":"दाहोद",
    "Dakshin Dinajpur":"दक्षिण दिनाजपुर",
    "Dakshina Kannada":"दक्षिण कन्नड",
    "Damoh":"दमोह",
    "Dang":"डांग",
    "Dantewada":"दंतेवाड़ा",
    "Darbhanga":"दरभंगा",
    "Darjeeling":"दार्जिलिंग",
    "Darrang":"दरांग",
    "Datia":"दतिया",
    "Dausa":"दौसा",
    "Davanagere":"दावणगेरे",
    "Dehradun":"देहरादून",
    "Deogarh":"देवगढ़",
    "Deoghar":"देवघर",
    "Deoria":"देवरिया",
    "Devbhoomi Dwarka":"देवभूमि द्वारका",
    "Dewas":"देवास",
    "Dhalai":"धलाई",
    "Dhamtari":"धमतरी",
    "Dhanbad":"धनबाद",
    "Dhar":"धार",
    "Dharmapuri":"धर्मपुरी",
    "Dharwad":"धारवाड",
    "Dhemaji":"धेमाजी",
    "Dhenkanal":"ढेंकानाल",
    "Dholpur":"धौलपुर",
    "Dhubri":"धुबरी",
    "Dhule":"धुले",
    "Dibang Valley":"दिबांग घाटी",
    "Dibrugarh":"डिब्रूगढ़",
    "Dima Hasao":"दीमा हसाओ",
    "Dimapur":"दीमापुर",
    "Dindigul":"डिंडिगुल",
    "Dindori":"डिंडोरी",
    "Doda":"डोडा",
    "Dumka":"दुमका",
    "Dungarpur":"डूंगरपुर",
    "Durg":"दुर्ग",
    "East Champaran":"पूर्वी चंपारण",
    "East Delhi":"पूर्वी दिल्ली",
    "East Garo Hills":"पूर्व गारो हिल्स",
    "East Godavari":"पूर्वी गोदावरी",
    "East Jaintia Hills":"पूर्वी जयंतिया हिल्स",
    "East Kameng":"पूर्व कामेंग",
    "East Khasi Hills":"पूर्वी खासी हिल्स",
    "East Siang":"पूर्व सियांग",
    "East Sikkim":"पूर्वी सिक्किम",
    "East Singhbhum":"पूर्वी सिंहभूम",
    "Eastern West Khasi Hills":"पूर्वी पश्चिम खासी हिल्स",
    "Eluru":"एलुरु",
    "Ernakulam":"एर्नाकुलम",
    "Erode":"इरोड",
    "Etah":"एटा",
    "Etawah":"इटावा",
    "Faridabad":"फरीदाबाद",
    "Faridkot":"फरीदकोट",
    "Farrukhabad":"फर्रुखाबाद",
    "Fatehabad":"फतेहाबाद",
    "Fatehgarh Sahib":"फतेहगढ़ साहिब",
    "Fatehpur":"फतेहपुर",
    "Fazilka":"फाजिल्का",
    "Ferozepur":"फिरोजपुर",
    "Firozabad":"फिरोजाबाद",
    "Gadag":"गदग",
    "Gadchiroli":"गडचिरोली",
    "Gajapati":"गजपति",
    "Ganderbal":"गांदरबल",
    "Gandhinagar":"गांधीनगर",
    "Ganganagar":"गंगानगर",
    "Ganjam":"गंजाम",
    "Garhwa":"गढ़वा",
    "Gariaband":"गरियाबंद",
    "Gaurela Pendra Marwahi":"गौरेला-पेंड्रा-मरवाही",
    "Gautam Buddha Nagar":"गौतम बुद्ध नगर",
    "Gaya":"गया",
    "Ghaziabad":"गाजियाबाद",
    "Ghazipur":"गाजीपुर",
    "Gir Somnath":"गिर सोमनाथ",
    "Giridih":"गिरिडीह",
    "Goalpara":"गोलपारा",
    "Godda":"गोड्डा",
    "Golaghat":"गोलाघाट",
    "Gomati":"गोमती",
    "Gonda":"गोंडा",
    "Gondia":"गोंदिया",
    "Gopalganj":"गोपालगंज",
    "Gorakhpur":"गोरखपुर",
    "Gumla":"गुमला",
    "Guna":"गुना",
    "Guntur":"गुंटूर",
    "Gurdaspur":"गुरदासपुर",
    "Gurugram":"गुरुग्राम",
    "Gwalior":"ग्वालियर",
    "Hailakandi":"हैलाकांदी",
    "Hamirpur":"हमीरपुर",
    "Hanumakonda":"हनुमकोंडा",
    "Hanumangarh":"हनुमानगढ़",
    "Hapur":"हापुड़",
    "Harda":"हरदा",
    "Hardoi":"हरदोई",
    "Haridwar":"हरिद्वार",
    "Hassan":"हासन",
    "Hathras":"हाथरस",
    "Haveri":"हावेरी",
    "Hazaribagh":"हजारीबाग",
    "Hingoli":"हिंगोली",
    "Hisar":"हिसार",
    "Hnahthial":"ह्नाहथियल",
    "Hojai":"होजाई",
    "Hooghly":"हुगली",
    "Hoshangabad":"होशंगाबाद",
    "Hoshiarpur":"होशियारपुर",
    "Howrah":"हावड़ा",
    "Hyderabad":"हैदराबाद",
    "Idukki":"इडुक्की",
    "Imphal East":"इंफाल पूर्व",
    "Imphal West":"इंफाल पश्चिम",
    "Indore":"इंदौर",
    "Jabalpur":"जबलपुर",
    "Jagatsinghpur":"जगतसिंहपुर",
    "Jagtial":"जगतियाल",
    "Jaipur":"जयपुर",
    "Jaisalmer":"जैसलमेर",
    "Jajpur":"जाजपुर",
    "Jalandhar":"जालंधर",
    "Jalaun":"जालौन",
    "Jalgaon":"जलगाव",
    "Jalna":"जालना",
    "Jalore":"जालोर",
    "Jalpaiguri":"जलपाईगुड़ी",
    "Jammu":"जम्मू",
    "Jamnagar":"जामनगर",
    "Jamtara":"जामताड़ा",
    "Jamui":"जमुई",
    "Jangaon":"जंगाओं",
    "Janjgir Champa":"जांजगीर-चांपा",
    "Jashpur":"जशपुर",
    "Jaunpur":"जौनपुर",
    "Jayashankar Bhupalpally":"जयशंकर भूपालपल्ली",
    "Jehanabad":"जहानाबाद",
    "Jhabua":"झाबुआ",
    "Jhajjar":"झज्जर",
    "Jhalawar":"झालावाड़",
    "Jhansi":"झांसी",
    "Jhargram":"झाड़ग्राम",
    "Jharsuguda":"झारसुगुड़ा",
    "Jhunjhunu":"झुंझुनू",
    "Jind":"जींद",
    "Jiribam":"जिरीबाम",
    "Jodhpur":"जोधपुर",
    "Jogulamba Gadwal":"जोगुलांबा गडवाल",
    "Jorhat":"जोरहाट",
    "Junagadh":"जूनागढ",
    "Kabirdham":"कबीरधाम",
    "Kadapa":"कडप्पा",
    "Kaimur":"कैमूर",
    "Kaithal":"कैथल",
    "Kakching":"काकचिंग",
    "Kakinada":"काकीनाडा",
    "Kalaburagi":"कलबुर्गी",
    "Kalahandi":"कलाहांडी",
    "Kalimpong":"कालिम्पोंग",
    "Kallakurichi":"कल्लाकुरिची",
    "Kamareddy":"कामारेड्डी",
    "Kamjong":"कामजोंग",
    "Kamle":"कामले",
    "Kamrup":"कामरूप",
    "Kamrup Metropolitan":"कामरूप महानगर",
    "Kancheepuram":"कांचीपुरम",
    "Kandhamal":"कंधमाल",
    "Kangpokpi":"कांगपोकपी",
    "Kangra":"कांगड़ा",
    "Kanker":"कांकेर",
    "Kannauj":"कन्नौज",
    "Kanniyakumari":"कन्याकुमारी",
    "Kannur":"कन्नूर",
    "Kanpur Dehat":"कानपुर देहात",
    "Kanpur Nagar":"कानपुर नगर",
    "Kapurthala":"कपूरथला",
    "Karaikal":"कराईकाल",
    "Karauli":"करौली",
    "Karbi Anglong":"कार्बी आंगलांग",
    "Kargil":"कारगिल",
    "Karimganj":"करीमगंज",
    "Karimnagar":"करीमनगर",
    "Karnal":"करनाल",
    "Karur":"करूर",
    "Kasaragod":"कासरगोड",
    "Kasganj":"कासगंज",
    "Kathua":"कठुआ",
    "Katihar":"कटिहार",
    "Katni":"कटनी",
    "Kaushambi":"कौशांबी",
    "Kendrapara":"केंद्रापड़ा",
    "Kendujhar":"केंदुझर",
    "Khagaria":"खगड़िया",
    "Khairagarh":"खैरागढ़",
    "Khammam":"खम्मम",
    "Khandwa":"खंडवा",
    "Khargone":"खरगोन",
    "Khawzawl":"खावजावल",
    "Kheda":"खेडा",
    "Khordha":"खोर्धा",
    "Khowai":"खोवाई",
    "Khunti":"खूंटी",
    "Kinnaur":"किन्नौर",
    "Kiphire":"किफिरे",
    "Kishanganj":"किशनगंज",
    "Kishtwar":"किश्तवाड़",
    "Kodagu":"कोडागु",
    "Koderma":"कोडरमा",
    "Kohima":"कोहिमा",
    "Kokrajhar":"कोकराझाड़",
    "Kolar":"कोलार",
    "Kolasib":"कोलासिब",
    "Kolhapur":"कोल्हापुर",
    "Kolkata":"कोलकाता",
    "Kollam":"कोल्लम",
    "Konaseema":"कोनासीमा",
    "Kondagaon":"कोंडागांव",
    "Koppal":"कोप्पल",
    "Koraput":"कोरापुट",
    "Korba":"कोरबा",
    "Koriya":"कोरिया",
    "Kota":"कोटा",
    "Kottayam":"कोट्टायम",
    "Kozhikode":"कोझिकोड",
    "Kra Daadi":"क्रा दादी",
    "Krishna":"कृष्णा",
    "Krishnagiri":"कृष्णगिरि",
    "Kulgam":"कुलगाम",
    "Kullu":"कुल्लू",
    "Kumuram Bheem":"कुमुराम भीम",
    "Kupwara":"कुपवाड़ा",
    "Kurnool":"कर्नूल",
    "Kurukshetra":"कुरुक्षेत्र",
    "Kurung Kumey":"कुरुंग कुमेई",
    "Kushinagar":"कुशीनगर",
    "Kutch":"कच्छ",
    "Lahaul Spiti":"लाहौल स्पीति",
    "Lakhimpur":"लखीमपुर",
    "Lakhimpur Kheri":"लखीमपुर खीरी",
    "Lakhisarai":"लखीसराय",
    "Lalitpur":"ललितपुर",
    "Latehar":"लातेहार",
    "Latur":"लातूर",
    "Lawngtlai":"लवंगटलाई",
    "Leh":"लेह",
    "Lepa Rada":"लेपा राडा",
    "Lohardaga":"लोहरदगा",
    "Lohit":"लोहित",
    "Longding":"लोंगडिंग",
    "Longleng":"लोंगलेंग",
    "Lower Dibang Valley":"निचला दिबांग घाटी",
    "Lower Siang":"निचला सियांग",
    "Lower Subansiri":"निचला सुबनसिरी",
    "Lucknow":"लखनऊ",
    "Ludhiana":"लुधियाना",
    "Lunglei":"लुंगलेई",
    "Madhepura":"मधेपुरा",
    "Madhubani":"मधुबनी",
    "Madurai":"मदुरै",
    "Mahabubabad":"महबूबाबाद",
    "Mahabubnagar":"महबूबनगर",
    "Maharajganj":"महाराजगंज",
    "Mahasamund":"महासमुंद",
    "Mahe":"माहे",
    "Puducherry":"पुडुचेरी",
    "Mahendragarh":"महेंद्रगढ़",
    "Mahisagar":"महिसागर",
    "Mahoba":"महोबा",
    "Mainpuri":"मैनपुरी",
    "Majuli":"माजुली",
    "Malappuram":"मलप्पुरम",
    "Malda":"मालदा",
    "Malerkotla":"मलेरकोटला",
    "Malkangiri":"मलकानगिरि",
    "Mamit":"मामित",
    "Mancherial":"मंचेरियल",
    "Mandi":"मंडी",
    "Mandla":"मंडला",
    "Mandsaur":"मंदसौर",
    "Mandya":"मांड्या",
    "Manendragarh":"मनेंद्रगढ़",
    "Mansa":"मानसा",
    "Mathura":"मथुरा",
    "Mau":"मऊ",
    "Mayiladuthurai":"मयिलादुतुरै",
    "Mayurbhanj":"मयूरभंज",
    "Medak":"मेडक",
    "Medchal Malkajgiri":"मेडचल-मल्काजगिरी",
    "Meerut":"मेरठ",
    "Mehsana":"मेहसाणा",
    "Mirzapur":"मिर्जापुर",
    "Moga":"मोगा",
    "Mohali":"मोहाली",
    "Mohla Manpur":"मोहला-मानपुर",
    "Mokokchung":"मोकोकचुंग",
    "Mon":"मोन",
    "Moradabad":"मुरादाबाद",
    "Morbi":"मोरबी",
    "Morena":"मुरैना",
    "Morigaon":"मोरीगांव",
    "Muktsar":"मुक्तसर",
    "Mulugu":"मुलुगु",
    "Mumbai City":"मुंबई शहर",
    "Mumbai Suburban":"मुंबई उपनगर",
    "Mungeli":"मुंगेली",
    "Munger":"मुंगेर",
    "Murshidabad":"मुर्शिदाबाद",
    "Muzaffarnagar":"मुजफ्फरनगर",
    "Muzaffarpur":"मुजफ्फरपुर",
    "Mysuru":"मैसूरु",
    "NTR":"एनटीआर जिला",
    "Nabarangpur":"नबरंगपुर",
    "Nadia":"नदिया",
    "Nagaon":"नगांव",
    "Nagapattinam":"नागपट्टिनम",
    "Nagarkurnool":"नगरकुर्नूल",
    "Nagaur":"नागौर",
    "Nagpur":"नागपुर",
    "Nainital":"नैनीताल",
    "Nalanda":"नालंदा",
    "Nalbari":"नलबाड़ी",
    "Nalgonda":"नलगोंडा",
    "Namakkal":"नामक्कल",
    "Namsai":"नामसाई",
    "Nanded":"नांदेड",
    "Nandurbar":"नंदुरबार",
    "Nandyal":"नंद्याल",
    "Narayanpet":"नारायणपेट",
    "Narayanpur":"नारायणपुर",
    "Narmada":"नर्मदा",
    "Narsinghpur":"नरसिंहपुर",
    "Nashik":"नाशिक",
    "Navsari":"नवसारी",
    "Nawada":"नवादा",
    "Nawanshahr":"नवांशहर",
    "Nayagarh":"नयागढ़",
    "Neemuch":"नीमच",
    "Nellore":"नेल्लोर",
    "New Delhi":"नई दिल्ली",
    "Nirmal":"निर्मल",
    "Niuland":"नियूलैंड",
    "Niwari":"निवाड़ी",
    "Nizamabad":"निजामाबाद",
    "Noklak":"नोक्लक",
    "Noney":"नोनी",
    "North 24 Parganas":"उत्तर 24 परगना",
    "North Delhi":"उत्तरी दिल्ली",
    "North East Delhi":"उत्तर पूर्वी दिल्ली",
    "North Garo Hills":"उत्तरी गारो हिल्स",
    "North Goa":"उत्तरी गोआ",
    "North Sikkim":"उत्तरी सिक्किम",
    "North Tripura":"उत्तर त्रिपुरा",
    "North West Delhi":"उत्तर पश्चिमी दिल्ली",
    "Nuapada":"नुआपाड़ा",
    "Nuh":"नूंह",
    "Osmanabad":"उस्मानाबाद",
    "Pakke Kessang":"पक्के केसांग",
    "Pakur":"पाकुड़",
    "Pakyong":"पाक्योंग",
    "Palakkad":"पलक्कड़",
    "Palamu":"पलामू",
    "Palghar":"पालघर",
    "Pali":"पाली",
    "Palnadu":"पलनाडु",
    "Palwal":"पलवल",
    "Panchkula":"पंचकुला",
    "Panchmahal":"पंचमहाल",
    "Panipat":"पानीपत",
    "Panna":"पन्ना",
    "Papum Pare":"पापुम पारे",
    "Parbhani":"परभणी",
    "Paschim Bardhaman":"पश्चिम बर्दमान",
    "Paschim Medinipur":"पश्चिम मेदिनीपुर",
    "Patan":"पाटन",
    "Pathanamthitta":"पठानमथिट्टा",
    "Pathankot":"पठानकोट",
    "Patiala":"पटियाला",
    "Patna":"पटना",
    "Pauri Garhwal":"पौड़ी गढ़वाल",
    "Peddapalli":"पेद्दापल्ली",
    "Perambalur":"पेरम्बलूर",
    "Peren":"पेरेन",
    "Phek":"फेक",
    "Pherzawl":"फेरजॉल",
    "Pilibhit":"पीलीभीत",
    "Pithoragarh":"पिथौरागढ़",
    "Poonch":"पुंछ",
    "Porbandar":"पोरबंदर",
    "Prakasam":"प्रकाशम",
    "Pratapgarh":"प्रतापगढ़",
    "Pudukkottai":"पुदुक्कोट्टई",
    "Pulwama":"पुलवामा",
    "Pune":"पुणे",
    "Purba Bardhaman":"पूर्वी बर्दमान",
    "Purba Medinipur":"पूर्वी मेदिनीपुर",
    "Puri":"पुरी",
    "Purnia":"पूर्णिया",
    "Purulia":"पुरुलिया",
    "Raebareli":"रायबरेली",
    "Raichur":"रायचूर",
    "Raigad":"रायगड",
    "Raigarh":"रायगढ़",
    "Raipur":"रायपुर",
    "Raisen":"रायसेन",
    "Rajanna Sircilla":"राजन्ना सिरसिल्ला",
    "Rajgarh":"राजगढ़",
    "Rajkot":"राजकोट",
    "Rajnandgaon":"राजनांदगांव",
    "Rajsamand":"राजसमंद",
    "Ramanagara":"रामनगर",
    "Ramanathapuram":"रामनाथपुरम",
    "Ramban":"रामबन",
    "Ramgarh":"रामगढ़",
    "Rampur":"रामपुर",
    "Ranchi":"रांची",
    "Rangareddy":"रंगारेड्डी",
    "Ranipet":"रानीपेट",
    "Ratlam":"रतलाम",
    "Ratnagiri":"रत्नागिरी",
    "Rayagada":"रायगड़ा",
    "Reasi":"रियासी",
    "Rewa":"रीवा",
    "Rewari":"रेवाड़ी",
    "Ri Bhoi":"री भोई",
    "Rohtak":"रोहतक",
    "Rohtas":"रोहतास",
    "Rudraprayag":"रुद्रप्रयाग",
    "Rupnagar":"रूपनगर",
    "Sabarkantha":"साबरकांठा",
    "Sagar":"सागर",
    "Saharanpur":"सहारनपुर",
    "Saharsa":"सहरसा",
    "Sahebganj":"साहेबगंज",
    "Saiha":"सियाहा",
    "Saitual":"सैतुअल",
    "Sakti":"सक्ती",
    "Salem":"सेलम",
    "Samastipur":"समस्तीपुर",
    "Samba":"सांबा",
    "Sambalpur":"संबलपुर",
    "Sambhal":"संभल",
    "Sangareddy":"संगारेड्डी",
    "Sangli":"सांगली",
    "Sangrur":"संगरूर",
    "Sant Kabir Nagar":"संत कबीर नगर",
    "Saran":"सारण",
    "Sarangarh Bilaigarh":"सारंगढ़-बिलाईगढ़",
    "Satara":"सातारा",
    "Satna":"सतना",
    "Sawai Madhopur":"सवाई माधोपुर",
    "Sehore":"सीहोर",
    "Senapati":"सेनापति",
    "Seoni":"सिवनी",
    "Sepahijala":"सेपाहिजाला",
    "Seraikela Kharsawan":"सरायकेला खरसावां",
    "Serchhip":"सेर्छिप",
    "Shahdara":"शाहदरा",
    "Shahdol":"शहडोल",
    "Shahjahanpur":"शाहजहांपुर",
    "Shajapur":"शाजापुर",
    "Shamator":"शामाटोर",
    "Shamli":"शामली",
    "Sheikhpura":"शेखपुरा",
    "Sheohar":"शिवहर",
    "Sheopur":"श्योपुर",
    "Shi Yomi":"शी योमी",
    "Shimla":"शिमला",
    "Shivamogga":"शिवमोग्गा",
    "Shivpuri":"शिवपुरी",
    "Shopian":"शोपियां",
    "Shrawasti":"श्रावस्ती",
    "Siang":"सियांग",
    "Siddharthnagar":"सिद्धार्थनगर",
    "Siddipet":"सिद्दिपेट",
    "Sidhi":"सीधी",
    "Sikar":"सीकर",
    "Simdega":"सिमडेगा",
    "Sindhudurg":"सिंधुदुर्ग",
    "Singrauli":"सिंगरौली",
    "Sipahijala":"सिपाहीजाला",
    "Sirmaur":"सिरमौर",
    "Sirohi":"सिरोही",
    "Sirsa":"सिरसा",
    "Sitamarhi":"सीतामढ़ी",
    "Sitapur":"सीतापुर",
    "Sivaganga":"शिवगंगा",
    "Sivasagar":"शिवसागर",
    "Siwan":"सिवान",
    "Solan":"सोलन",
    "Solapur":"सोलापुर",
    "Sonbhadra":"सोनभद्र",
    "Sonepur":"सोनपुर",
    "Sonipat":"सोनीपत",
    "Sonitpur":"सोनितपुर",
    "Soreng":"सोरेंग",
    "South 24 Parganas":"दक्षिण 24 परगना",
    "South Delhi":"दक्षिणी दिल्ली",
    "South East Delhi":"दक्षिण पूर्वी दिल्ली",
    "South Garo Hills":"दक्षिणी गारो हिल्स",
    "South Goa":"दक्षिणी गोआ",
    "South Salmara-Mankachar":"दक्षिण सलमारा-मनकाचर",
    "South Sikkim":"दक्षिणी सिक्किम",
    "South Tripura":"दक्षिण त्रिपुरा",
    "South West Delhi":"दक्षिण पश्चिमी दिल्ली",
    "South West Garo Hills":"दक्षिण पश्चिम गारो हिल्स",
    "South West Khasi Hills":"दक्षिण पश्चिम खासी हिल्स",
    "Sri Potti Sriramulu Nellore":"श्री पोट्टी श्रीरामुलु नेल्लोर",
    "Srikakulam":"श्रीकाकुलम",
    "Srinagar":"श्रीनगर",
    "Sukma":"सुकमा",
    "Sultanpur":"सुल्तानपुर",
    "Sundargarh":"सुंदरगढ़",
    "Supaul":"सुपौल",
    "Surajpur":"सूरजपुर",
    "Surat":"सूरत",
    "Surendranagar":"सुरेंद्रनगर",
    "Surguja":"सरगुजा",
    "Suryapet":"सूर्यापेट",
    "Tamenglong":"तामेंगलोंग",
    "Tapi":"तापी",
    "Tarn Taran":"तरन तारन",
    "Tawang":"तवांग",
    "Tehri Garhwal":"टिहरी गढ़वाल",
    "Tengnoupal":"तेंग्नौपाल",
    "Tenkasi":"तेनकासी",
    "Thane":"ठाणे",
    "Thanjavur":"तंजावुर",
    "Theni":"थेनी",
    "Thiruvananthapuram":"तिरुवनंतपुरम",
    "Thoothukudi":"तूतुकुडि",
    "Thoubal":"थौबल",
    "Thrissur":"त्रिशूर",
    "Tikamgarh":"टीकमगढ़",
    "Tinsukia":"तिनसुकिया",
    "Tirap":"तिरप",
    "Tiruchirappalli":"तिरुचिरापल्ली",
    "Tirunelveli":"तिरुनेलवेली",
    "Tirupathur":"तिरुपत्तूर",
    "Tirupati":"तिरुपति",
    "Tiruppur":"तिरुपुर",
    "Tiruvallur":"तिरुवल्लूर",
    "Tiruvannamalai":"तिरुवन्नामलाई",
    "Tiruvarur":"तिरुवारूर",
    "Tonk":"टोंक",
    "Tseminyü":"सेमिन्यू",
    "Tuensang":"तुएंसांग",
    "Tumakuru":"तुमकुरू",
    "Udaipur":"उदयपुर",
    "Udalguri":"उदलगुड़ी",
    "Udham Singh Nagar":"उधम सिंह नगर",
    "Udhampur":"उधमपुर",
    "Udupi":"उडुपी",
    "Ujjain":"उज्जैन",
    "Ukhrul":"उखरूल",
    "Umaria":"उमरिया",
    "Una":"ऊना",
    "Unakoti":"उनकोटी",
    "Unnao":"उन्नाव",
    "Upper Siang":"ऊपरी सियांग",
    "Upper Subansiri":"ऊपरी सुबनसिरी",
    "Uttar Dinajpur":"उत्तर दिनाजपुर",
    "Uttara Kannada":"उत्तर कन्नड",
    "Uttarkashi":"उत्तरकाशी",
    "Vadodara":"वडोदरा",
    "Vaishali":"वैशाली",
    "Valsad":"वलसाड",
    "Varanasi":"वाराणसी",
    "Vellore":"वेल्लोर",
    "Vidisha":"विदिशा",
    "Vijayapura":"विजयपुर",
    "Vikarabad":"विकाराबाद",
    "Viluppuram":"विलुप्पुरम",
    "Virudhunagar":"विरुधुनगर",
    "Visakhapatnam":"विशाखापत्तनम",
    "Vizianagaram":"विजयनगरम",
    "Wanaparthy":"वानापर्थी",
    "Warangal":"वारंगल",
    "Wardha":"वर्धा",
    "Washim":"वाशिम",
    "Wayanad":"वायनाड",
    "West Champaran":"पश्चिम चंपारण",
    "West Delhi":"पश्चिमी दिल्ली",
    "West Garo Hills":"पश्चिम गारो हिल्स",
    "West Godavari":"पश्चिमी गोदावरी",
    "West Jaintia Hills":"पश्चिम जयंतिया हिल्स",
    "West Kameng":"पश्चिम कामेंग",
    "West Karbi Anglong":"पश्चिम कार्बी आंगलांग",
    "West Khasi Hills":"पश्चिम खासी हिल्स",
    "West Siang":"पश्चिम सियांग",
    "West Sikkim":"पश्चिमी सिक्किम",
    "West Singhbhum":"पश्चिमी सिंहभूम",
    "West Tripura":"पश्चिम त्रिपुरा",
    "Wokha":"वोखा",
    "Yadadri Bhuvanagiri":"यदाद्री भुवनगिरि",
    "Yadgir":"यादगीर",
    "Yamunanagar":"यमुनानगर",
    "Yanam":"यानम",
    "Yavatmal":"यवतमाल",
    "Zunheboto":"जुन्हेबोटो"
  },
  te: {
    "Adilabad":"ఆదిలాబాద్",
    "Agar Malwa":"ఆగర్ మాల్వా",
    "Agra":"ఆగ్రా",
    "Ahmedabad":"అహ్మదాబాద్",
    "Ahmednagar":"అహ్మద్‌నగర్",
    "Aizawl":"ఐజావ్ల్",
    "Ajmer":"అజ్మేర్",
    "Akola":"అకోలా",
    "Alappuzha":"అలాప్పుఝా",
    "Aligarh":"అలీఘర్",
    "Alipurduar":"అలిపుర్‌ద్వార్",
    "Alirajpur":"అలీరాజ్‌పూర్",
    "Allahabad":"అలహాబాద్",
    "Almora":"అల్మోరా",
    "Alwar":"అల్వర్",
    "Ambala":"అంబాలా",
    "Ambedkar Nagar":"అంబేడ్కర్ నగర్",
    "Amethi":"అమేఠి",
    "Amravati":"అమరావతి",
    "Amreli":"అమ్రేలి",
    "Amritsar":"అమృత్‌సర్",
    "Amroha":"అమ్రోహా",
    "Anand":"ఆనంద్",
    "Anantapur":"అనంతపురం",
    "Anantnag":"అనంత్‌నాగ్",
    "Angul":"అంగుల్",
    "Anjaw":"అంజావ్",
    "Anuppur":"అనూప్పూర్",
    "Araria":"అరారియా",
    "Aravalli":"అరావళ్ళి",
    "Ariyalur":"అరియలూర్",
    "Arwal":"అర్వల్",
    "Ashoknagar":"అశోక్‌నగర్",
    "Auraiya":"ఔరయ్యా",
    "Aurangabad":"ఔరంగాబాద్",
    "Ayodhya":"అయోధ్య",
    "Azamgarh":"ఆజమ్‌గఢ్",
    "Bagalkote":"బాగల్‌కోట్",
    "Bageshwar":"బాగేశ్వర్",
    "Baghpat":"బాఘ్‌పట్",
    "Bahraich":"బహ్రాయిచ్",
    "Bajali":"బజాలి",
    "Baksa":"బక్సా",
    "Balaghat":"బాలాఘాట్",
    "Balangir":"బలాంగీర్",
    "Balasore":"బాలాసోర్",
    "Ballari":"బళ్ళారి",
    "Ballia":"బల్లియా",
    "Balod":"బాలోద్",
    "Baloda Bazar":"బలోదా బాజార్",
    "Balrampur":"బల్రాంపూర్",
    "Banaskantha":"బనాస్‌కాంఠా",
    "Banda":"బాందా",
    "Bandipora":"బాందిపోరా",
    "Banka":"బాంకా",
    "Bankura":"బంకురా",
    "Banswara":"బాన్స్‌వారా",
    "Bapatla":"బాపట్ల",
    "Barabanki":"బారాబంకి",
    "Baramulla":"బారాముల్లా",
    "Baran":"బారాన్",
    "Bareilly":"బరేలి",
    "Bargarh":"బర్‌గఢ్",
    "Barmer":"బార్మేర్",
    "Barnala":"బర్నాలా",
    "Barpeta":"బార్‌పేటా",
    "Barwani":"బర్వాని",
    "Bastar":"బస్తర్",
    "Basti":"బస్తి",
    "Bathinda":"బఠిండా",
    "Beed":"బీడ్",
    "Begusarai":"బేగూసరాయ్",
    "Belagavi":"బెళగావి",
    "Bemetara":"బేమేతర",
    "Bengaluru Rural":"బెంగళూరు గ్రామీణ",
    "Bengaluru Urban":"బెంగళూరు పట్టణ",
    "Betul":"బేతుల్",
    "Bhadradri Kothagudem":"భద్రాద్రి కొఠాగూడెం",
    "Bhadrak":"భద్రక్",
    "Bhagalpur":"భాగల్‌పూర్",
    "Bhandara":"భండారా",
    "Bharatpur":"భరత్‌పూర్",
    "Bharuch":"భరూచ్",
    "Bhavnagar":"భావ్‌నగర్",
    "Bhilwara":"భిల్వారా",
    "Bhind":"భింద్",
    "Bhiwani":"భివాని",
    "Bhojpur":"భోజ్‌పూర్",
    "Bhopal":"భోపాల్",
    "Bidar":"బీదర్",
    "Bijapur":"బీజాపూర్",
    "Bijnor":"బిజ్‌నోర్",
    "Bikaner":"బికానేర్",
    "Bilaspur":"బిలాస్‌పూర్",
    "Birbhum":"బీర్‌భూమ్",
    "Bishnupur":"బిష్ణుపూర్",
    "Biswanath":"బిశ్వనాథ్",
    "Bokaro":"బొకారో",
    "Bongaigaon":"బోంగాయిగావ్",
    "Botad":"బోటాడ్",
    "Boudh":"బౌధ్",
    "Budaun":"బదాయూన్",
    "Budgam":"బడ్‌గామ్",
    "Bulandshahr":"బులంద్‌షహర్",
    "Buldhana":"బుల్ఢాణా",
    "Bundi":"బుండి",
    "Burhanpur":"బుర్హాన్‌పూర్",
    "Buxar":"బక్సర్",
    "Cachar":"కచ్చార్",
    "Central Delhi":"సెంట్రల్ ఢిల్లీ",
    "Chamarajanagar":"చామరాజనగర",
    "Chamba":"చంబా",
    "Chamoli":"చమోలీ",
    "Champawat":"చంపావత్",
    "Champhai":"చంఫై",
    "Chandauli":"చందౌలి",
    "Chandel":"చందేల్",
    "Chandrapur":"చంద్రపూర్",
    "Changlang":"చాంగ్లాంగ్",
    "Charaideo":"చరాయిదేవ్",
    "Charkhi Dadri":"చర్ఖి దాద్రి",
    "Chatra":"చత్రా",
    "Chengalpattu":"చెంగల్పట్టు",
    "Chennai":"చెన్నై",
    "Chhatarpur":"చత్తర్‌పూర్",
    "Chhindwara":"ఛింద్వారా",
    "Chhota Udaipur":"చోటా ఉదయపూర్",
    "Chikkaballapura":"చిక్కబళ్ళాపుర",
    "Chikkamagaluru":"చిక్కమగళూరు",
    "Chirang":"చిరాంగ్",
    "Chitradurga":"చిత్రదుర్గ",
    "Chitrakoot":"చిత్రకూట్",
    "Chittoor":"చిత్తూరు",
    "Chittorgarh":"చిత్తోర్‌గఢ్",
    "Chumoukedima":"చుమౌకేదిమా",
    "Churachandpur":"చురాచాంద్‌పూర్",
    "Churu":"చురూ",
    "Coimbatore":"కోయంబత్తూరు",
    "Cooch Behar":"కూచ్ బెహార్",
    "Cuddalore":"కడ్డలూరు",
    "Cuttack":"కటక్",
    "Dahod":"దాహోద్",
    "Dakshin Dinajpur":"దక్షిణ దినాజ్‌పూర్",
    "Dakshina Kannada":"దక్షిణ కన్నడ",
    "Damoh":"దమోహ్",
    "Dang":"డాంగ్",
    "Dantewada":"దంతేవాడా",
    "Darbhanga":"దర్భంగా",
    "Darjeeling":"దార్జిలింగ్",
    "Darrang":"దర్రాంగ్",
    "Datia":"దతియా",
    "Dausa":"దౌసా",
    "Davanagere":"దావణగెరె",
    "Dehradun":"దేహ్రాదూన్",
    "Deogarh":"దేవ్‌గఢ్",
    "Deoghar":"దేవఘర్",
    "Deoria":"దేవరియా",
    "Devbhoomi Dwarka":"దేవభూమి ద్వారక",
    "Dewas":"దేవాస్",
    "Dhalai":"ఢలాయి",
    "Dhamtari":"ధమ్తరి",
    "Dhanbad":"ధన్‌బాద్",
    "Dhar":"ధార్",
    "Dharmapuri":"ధర్మపురి",
    "Dharwad":"ధారవాడ",
    "Dhemaji":"ఢేమాజి",
    "Dhenkanal":"ఢేంకానాల్",
    "Dholpur":"ధోల్‌పూర్",
    "Dhubri":"ధుబ్రి",
    "Dhule":"ధులే",
    "Dibang Valley":"డిబాంగ్ వ్యాలీ",
    "Dibrugarh":"డిబ్రూ‌గఢ్",
    "Dima Hasao":"డిమా హసావ్",
    "Dimapur":"డిమాపూర్",
    "Dindigul":"దిండిగల్",
    "Dindori":"డిండోరి",
    "Doda":"డోడా",
    "Dumka":"డుంకా",
    "Dungarpur":"డుంగర్‌పూర్",
    "Durg":"దుర్గ్",
    "East Champaran":"తూర్పు చంపారణ్",
    "East Delhi":"తూర్పు ఢిల్లీ",
    "East Garo Hills":"తూర్పు గారో హిల్స్",
    "East Godavari":"తూర్పు గోదావరి",
    "East Jaintia Hills":"తూర్పు జయంతియా హిల్స్",
    "East Kameng":"తూర్పు కమేంగ్",
    "East Khasi Hills":"తూర్పు ఖాసి హిల్స్",
    "East Siang":"తూర్పు సియాంగ్",
    "East Sikkim":"తూర్పు సిక్కిం",
    "East Singhbhum":"తూర్పు సింగ్‌భూమ్",
    "Eastern West Khasi Hills":"తూర్పు పశ్చిమ ఖాసి హిల్స్",
    "Eluru":"ఏలూరు",
    "Ernakulam":"ఎర్నాకుళం",
    "Erode":"ఈరోడు",
    "Etah":"ఎటా",
    "Etawah":"ఇటావా",
    "Faridabad":"ఫరీదాబాద్",
    "Faridkot":"ఫరీద్‌కోట్",
    "Farrukhabad":"ఫర్రుఖాబాద్",
    "Fatehabad":"ఫతేహాబాద్",
    "Fatehgarh Sahib":"ఫతేహ్‌గఢ్ సాహిబ్",
    "Fatehpur":"ఫతేహ్‌పూర్",
    "Fazilka":"ఫజిల్కా",
    "Ferozepur":"ఫిరోజ్‌పూర్",
    "Firozabad":"ఫిరోజాబాద్",
    "Gadag":"గదగ్",
    "Gadchiroli":"గడ్చిరోలి",
    "Gajapati":"గజపతి",
    "Ganderbal":"గాందర్‌బల్",
    "Gandhinagar":"గాంధీనగర్",
    "Ganganagar":"గంగానగర్",
    "Ganjam":"గంజాం",
    "Garhwa":"గఢ్వా",
    "Gariaband":"గరియాబంద్",
    "Gaurela Pendra Marwahi":"గౌరేలా-పేంద్రా-మర్వాహి",
    "Gautam Buddha Nagar":"గౌతమ బుద్ధ నగర్",
    "Gaya":"గయా",
    "Ghaziabad":"గాజియాబాద్",
    "Ghazipur":"గాజీపూర్",
    "Gir Somnath":"గిర్ సోమ్‌నాథ్",
    "Giridih":"గిరిడీహ్",
    "Goalpara":"గోల్‌పారా",
    "Godda":"గొడ్డా",
    "Golaghat":"గోలాఘాట్",
    "Gomati":"గోమతి",
    "Gonda":"గొందా",
    "Gondia":"గోండియా",
    "Gopalganj":"గోపాల్‌గంజ్",
    "Gorakhpur":"గోరఖ్‌పూర్",
    "Gumla":"గుమ్లా",
    "Guna":"గుణా",
    "Guntur":"గుంటూరు",
    "Gurdaspur":"గుర్దాస్‌పూర్",
    "Gurugram":"గురుగ్రామ్",
    "Gwalior":"గ్వాలియర్",
    "Hailakandi":"హైలాకందీ",
    "Hamirpur":"హమీర్‌పూర్",
    "Hanumakonda":"హనుమకొండ",
    "Hanumangarh":"హనుమాన్‌గఢ్",
    "Hapur":"హాపుర్",
    "Harda":"హర్దా",
    "Hardoi":"హర్దోయి",
    "Haridwar":"హరిద్వార్",
    "Hassan":"హాసన్",
    "Hathras":"హాథ్రాస్",
    "Haveri":"హావేరి",
    "Hazaribagh":"హజారీబాఘ్",
    "Hingoli":"హింగోలి",
    "Hisar":"హిసార్",
    "Hnahthial":"హ్నాహ్‌తియల్",
    "Hojai":"హోజాయి",
    "Hooghly":"హుగ్లీ",
    "Hoshangabad":"హోశంగాబాద్",
    "Hoshiarpur":"హోషియార్‌పూర్",
    "Howrah":"హౌరా",
    "Hyderabad":"హైదరాబాద్",
    "Idukki":"ఇడుక్కి",
    "Imphal East":"ఇంఫాల్ తూర్పు",
    "Imphal West":"ఇంఫాల్ పశ్చిమ",
    "Indore":"ఇందోర్",
    "Jabalpur":"జబల్‌పూర్",
    "Jagatsinghpur":"జగత్‌సింగ్‌పూర్",
    "Jagtial":"జగిత్యాల",
    "Jaipur":"జయపూర్",
    "Jaisalmer":"జైసల్మేర్",
    "Jajpur":"జాజ్‌పూర్",
    "Jalandhar":"జలంధర్",
    "Jalaun":"జాలౌన్",
    "Jalgaon":"జల్గావ్",
    "Jalna":"జాల్నా",
    "Jalore":"జాలోర్",
    "Jalpaiguri":"జల్పాయిగుడి",
    "Jammu":"జమ్మూ",
    "Jamnagar":"జామ్‌నగర్",
    "Jamtara":"జాంతారా",
    "Jamui":"జమూయి",
    "Jangaon":"జనగామ",
    "Janjgir Champa":"జాంజ్‌గీర్-చాంపా",
    "Jashpur":"జష్‌పూర్",
    "Jaunpur":"జౌన్‌పూర్",
    "Jayashankar Bhupalpally":"జయశంకర్ భూపాలపల్లి",
    "Jehanabad":"జహానాబాద్",
    "Jhabua":"జాబువా",
    "Jhajjar":"ఝజ్జర్",
    "Jhalawar":"జాలావాడ్",
    "Jhansi":"ఝాన్సీ",
    "Jhargram":"ఝార్‌గ్రామ్",
    "Jharsuguda":"ఝార్‌సుగుడా",
    "Jhunjhunu":"జున్‌జునూ",
    "Jind":"జింద్",
    "Jiribam":"జిరిబామ్",
    "Jodhpur":"జోధ్‌పూర్",
    "Jogulamba Gadwal":"జోగులాంబ గద్వాల",
    "Jorhat":"జోర్హాట్",
    "Junagadh":"జూనాగఢ్",
    "Kabirdham":"కబీర్‌ధామ్",
    "Kadapa":"కడప",
    "Kaimur":"కైమూర్",
    "Kaithal":"కైతాల్",
    "Kakching":"కాక్చింగ్",
    "Kakinada":"కాకినాడ",
    "Kalaburagi":"కలబురగి",
    "Kalahandi":"కలహండి",
    "Kalimpong":"కాలింపాంగ్",
    "Kallakurichi":"కల్లకుర్చి",
    "Kamareddy":"కామారెడ్డి",
    "Kamjong":"కామ్జాంగ్",
    "Kamle":"కమ్లే",
    "Kamrup":"కామ్‌రూప్",
    "Kamrup Metropolitan":"కామ్‌రూప్ మెట్రో",
    "Kancheepuram":"కాంచీపురం",
    "Kandhamal":"కందమాల్",
    "Kangpokpi":"కాంగ్‌పొక్పి",
    "Kangra":"కాంగ్రా",
    "Kanker":"కాంకేర్",
    "Kannauj":"కన్నౌజ్",
    "Kanniyakumari":"కన్యాకుమారి",
    "Kannur":"కన్నూర్",
    "Kanpur Dehat":"కాన్‌పూర్ దేహాత్",
    "Kanpur Nagar":"కాన్‌పూర్ నగర్",
    "Kapurthala":"కపూర్‌తలా",
    "Karaikal":"కరైకాల్",
    "Karauli":"కరౌలి",
    "Karbi Anglong":"కార్బి ఆంగ్లాంగ్",
    "Kargil":"కార్గిల్",
    "Karimganj":"కరీంగంజ్",
    "Karimnagar":"కరీంనగర్",
    "Karnal":"కర్నాల్",
    "Karur":"కరూర్",
    "Kasaragod":"కాసర్‌గోడ్",
    "Kasganj":"కాస్‌గంజ్",
    "Kathua":"కఠువా",
    "Katihar":"కటిహార్",
    "Katni":"కట్ని",
    "Kaushambi":"కౌశాంభి",
    "Kendrapara":"కేంద్రపారా",
    "Kendujhar":"కేంధుఝర్",
    "Khagaria":"ఖగారియా",
    "Khairagarh":"ఖైరాగఢ్",
    "Khammam":"ఖమ్మం",
    "Khandwa":"ఖండ్వా",
    "Khargone":"ఖర్గోన్",
    "Khawzawl":"ఖావ్జావ్ల్",
    "Kheda":"ఖేడా",
    "Khordha":"ఖోర్ధా",
    "Khowai":"ఖోవాయి",
    "Khunti":"ఖున్తి",
    "Kinnaur":"కిన్నౌర్",
    "Kiphire":"కిఫిరే",
    "Kishanganj":"కిషన్‌గంజ్",
    "Kishtwar":"కిష్ట్వార్",
    "Kodagu":"కొడగు",
    "Koderma":"కోడర్మా",
    "Kohima":"కోహిమా",
    "Kokrajhar":"కొక్రాఝార్",
    "Kolar":"కోలార్",
    "Kolasib":"కోలాసిబ్",
    "Kolhapur":"కొల్హాపూర్",
    "Kolkata":"కోల్‌కాతా",
    "Kollam":"కొల్లం",
    "Konaseema":"కోనసీమ",
    "Kondagaon":"కొందాగావ్",
    "Koppal":"కొప్పల్",
    "Koraput":"కోరాపుట్",
    "Korba":"కోర్బా",
    "Koriya":"కోరియా",
    "Kota":"కోటా",
    "Kottayam":"కొట్టాయం",
    "Kozhikode":"కోఝికోడ్",
    "Kra Daadi":"క్రా దాడి",
    "Krishna":"కృష్ణా",
    "Krishnagiri":"కృష్ణగిరి",
    "Kulgam":"కుల్‌గామ్",
    "Kullu":"కుల్లూ",
    "Kumuram Bheem":"కుమురంభీమ్",
    "Kupwara":"కుప్వారా",
    "Kurnool":"కర్నూలు",
    "Kurukshetra":"కురుక్షేత్ర",
    "Kurung Kumey":"కురుంగ్ కుమేయి",
    "Kushinagar":"కుషీనగర్",
    "Kutch":"కచ్చ్",
    "Lahaul Spiti":"లాహులు స్పీతి",
    "Lakhimpur":"లఖీంపూర్",
    "Lakhimpur Kheri":"లఖీంపూర్ ఖేరి",
    "Lakhisarai":"లఖిసరాయ్",
    "Lalitpur":"లలిత్‌పూర్",
    "Latehar":"లాతేహార్",
    "Latur":"లాతూర్",
    "Lawngtlai":"లాంగ్‌తలాయి",
    "Leh":"లేహ్",
    "Lepa Rada":"లేపా రాడా",
    "Lohardaga":"లోహర్‌దగా",
    "Lohit":"లోహిత్",
    "Longding":"లాంగ్డింగ్",
    "Longleng":"లాంగ్లేంగ్",
    "Lower Dibang Valley":"దిగువ డిబాంగ్ వ్యాలీ",
    "Lower Siang":"దిగువ సియాంగ్",
    "Lower Subansiri":"దిగువ సుబాన్‌సిరి",
    "Lucknow":"లక్నో",
    "Ludhiana":"లుధియానా",
    "Lunglei":"లుంగ్లేయి",
    "Madhepura":"మధేపురా",
    "Madhubani":"మధుబని",
    "Madurai":"మదురై",
    "Mahabubabad":"మహబూబాబాద్",
    "Mahabubnagar":"మహబూబ్‌నగర్",
    "Maharajganj":"మహారాజ్‌గంజ్",
    "Mahasamund":"మహాసముంద్",
    "Mahe":"మాహే",
    "Puducherry":"పుదుచ్చేరి",
    "Mahendragarh":"మహేంద్రగఢ్",
    "Mahisagar":"మహిసాగర్",
    "Mahoba":"మహోబా",
    "Mainpuri":"మైన్‌పురి",
    "Majuli":"మాజులి",
    "Malappuram":"మలప్పురం",
    "Malda":"మాల్డా",
    "Malerkotla":"మాలేర్‌కోట్లా",
    "Malkangiri":"మల్కాన్‌గిరి",
    "Mamit":"మామిట్",
    "Mancherial":"మంచిర్యాల",
    "Mandi":"మండి",
    "Mandla":"మండ్లా",
    "Mandsaur":"మంద్‌సౌర్",
    "Mandya":"మండ్య",
    "Manendragarh":"మనేంద్రగఢ్",
    "Mansa":"మాన్సా",
    "Mathura":"మథుర",
    "Mau":"మౌ",
    "Mayiladuthurai":"మయిలాదుతురై",
    "Mayurbhanj":"మయూర్‌భంజ్",
    "Medak":"మెదక్",
    "Medchal Malkajgiri":"మేడ్చల్-మల్కాజ్‌గిరి",
    "Meerut":"మేరఠ్",
    "Mehsana":"మెహ్‌సానా",
    "Mirzapur":"మిర్జాపూర్",
    "Moga":"మోగా",
    "Mohali":"మోహాలి",
    "Mohla Manpur":"మోహ్లా-మాన్‌పూర్",
    "Mokokchung":"మొకొక్చుంగ్",
    "Mon":"మోన్",
    "Moradabad":"మురాదాబాద్",
    "Morbi":"మోర్బి",
    "Morena":"మురేనా",
    "Morigaon":"మోరిగావ్",
    "Muktsar":"ముక్తసర్",
    "Mulugu":"ములుగు",
    "Mumbai City":"ముంబై నగర",
    "Mumbai Suburban":"ముంబై సబర్బన్",
    "Mungeli":"ముంగేలి",
    "Munger":"ముంగేర్",
    "Murshidabad":"ముర్షిదాబాద్",
    "Muzaffarnagar":"ముజఫ్ఫర్‌నగర్",
    "Muzaffarpur":"ముజఫ్ఫర్‌పూర్",
    "Mysuru":"మైసూరు",
    "NTR":"ఎన్టీఆర్ జిల్లా",
    "Nabarangpur":"నబరంగ్‌పూర్",
    "Nadia":"నదియా",
    "Nagaon":"నాగావ్",
    "Nagapattinam":"నాగపట్నం",
    "Nagarkurnool":"నాగర్‌కర్నూల్",
    "Nagaur":"నాగూర్",
    "Nagpur":"నాగపూర్",
    "Nainital":"నైనీతాల్",
    "Nalanda":"నాలంద",
    "Nalbari":"నల్బారి",
    "Nalgonda":"నల్గొండ",
    "Namakkal":"నమక్కల్",
    "Namsai":"నామ్సాయి",
    "Nanded":"నాందేడ్",
    "Nandurbar":"నందుర్బార్",
    "Nandyal":"నంద్యాల",
    "Narayanpet":"నారాయణపేట",
    "Narayanpur":"నారాయణపూర్",
    "Narmada":"నర్మదా",
    "Narsinghpur":"నర్సింహ్‌పూర్",
    "Nashik":"నాసిక్",
    "Navsari":"నవసారి",
    "Nawada":"నవాడా",
    "Nawanshahr":"నవాన్‌షహర్",
    "Nayagarh":"నయాగఢ్",
    "Neemuch":"నీమచ్",
    "Nellore":"నెల్లూరు",
    "New Delhi":"న్యూ ఢిల్లీ",
    "Nirmal":"నిర్మల్",
    "Niuland":"నియులాండ్",
    "Niwari":"నివారి",
    "Nizamabad":"నిజామాబాద్",
    "Noklak":"నోక్లక్",
    "Noney":"నోనీ",
    "North 24 Parganas":"ఉత్తర 24 పరగణాలు",
    "North Delhi":"ఉత్తర ఢిల్లీ",
    "North East Delhi":"ఈశాన్య ఢిల్లీ",
    "North Garo Hills":"ఉత్తర గారో హిల్స్",
    "North Goa":"ఉత్తర గోవా",
    "North Sikkim":"ఉత్తర సిక్కిం",
    "North Tripura":"ఉత్తర త్రిపుర",
    "North West Delhi":"వాయువ్య ఢిల్లీ",
    "Nuapada":"నుఆపాడా",
    "Nuh":"నూహ్",
    "Osmanabad":"ఉస్మానాబాద్",
    "Pakke Kessang":"పక్కే కేసాంగ్",
    "Pakur":"పాకుర్",
    "Pakyong":"పాక్యాంగ్",
    "Palakkad":"పాలక్కాడ్",
    "Palamu":"పాలమూ",
    "Palghar":"పాల్ఘర్",
    "Pali":"పాలి",
    "Palnadu":"పల్నాడు",
    "Palwal":"పల్వాల్",
    "Panchkula":"పంచకూల",
    "Panchmahal":"పంచమహాల్",
    "Panipat":"పానిపట్",
    "Panna":"పన్నా",
    "Papum Pare":"పాపుం పారే",
    "Parbhani":"పర్భణి",
    "Paschim Bardhaman":"పశ్చిమ బర్ద్‌మాన్",
    "Paschim Medinipur":"పశ్చిమ మెదినీపూర్",
    "Patan":"పాటన్",
    "Pathanamthitta":"పఠానమ్‌తిట్టా",
    "Pathankot":"పఠాన్‌కోట్",
    "Patiala":"పటియాలా",
    "Patna":"పట్నా",
    "Pauri Garhwal":"పౌరి గర్వాల్",
    "Peddapalli":"పెద్దపల్లి",
    "Perambalur":"పేరంబలూర్",
    "Peren":"పేరేన్",
    "Phek":"ఫేక్",
    "Pherzawl":"ఫేర్జావ్‌ల్",
    "Pilibhit":"పీలీభీత్",
    "Pithoragarh":"పిథోరాగఢ్",
    "Poonch":"పూంచ్",
    "Porbandar":"పోర్‌బందర్",
    "Prakasam":"ప్రకాశం",
    "Pratapgarh":"ప్రతాప్‌గఢ్",
    "Pudukkottai":"పుదుక్కోట్టై",
    "Pulwama":"పుల్వామా",
    "Pune":"పూణే",
    "Purba Bardhaman":"తూర్పు బర్ద్‌మాన్",
    "Purba Medinipur":"తూర్పు మెదినీపూర్",
    "Puri":"పూరి",
    "Purnia":"పూర్ణియా",
    "Purulia":"పురులియా",
    "Raebareli":"రాయ్ బరేలి",
    "Raichur":"రాయచూరు",
    "Raigad":"రాయగడ్",
    "Raigarh":"రాయ్‌గఢ్",
    "Raipur":"రాయపూర్",
    "Raisen":"రాయ్‌సేన్",
    "Rajanna Sircilla":"రాజన్న సిరిసిల్ల",
    "Rajgarh":"రాజ్‌గఢ్",
    "Rajkot":"రాజ్‌కోట్",
    "Rajnandgaon":"రాజ్‌నంద్‌గావ్",
    "Rajsamand":"రాజ్‌సమంద్",
    "Ramanagara":"రామనగర",
    "Ramanathapuram":"రామనాథపురం",
    "Ramban":"రాంబన్",
    "Ramgarh":"రాంగఢ్",
    "Rampur":"రాంపూర్",
    "Ranchi":"రాంచి",
    "Rangareddy":"రంగారెడ్డి",
    "Ranipet":"రాణిపేట",
    "Ratlam":"రత్లాం",
    "Ratnagiri":"రత్నగిరి",
    "Rayagada":"రాయగడా",
    "Reasi":"రియాసి",
    "Rewa":"రేవా",
    "Rewari":"రేవాడి",
    "Ri Bhoi":"రి భోయి",
    "Rohtak":"రోహ్తక్",
    "Rohtas":"రోహ్తాస్",
    "Rudraprayag":"రుద్రప్రయాగ్",
    "Rupnagar":"రూప్‌నగర్",
    "Sabarkantha":"సబర్‌కాంఠా",
    "Sagar":"సాగర్",
    "Saharanpur":"సహారన్‌పూర్",
    "Saharsa":"సహర్సా",
    "Sahebganj":"సాహేబ్‌గంజ్",
    "Saiha":"సియాహా",
    "Saitual":"సైతువల్",
    "Sakti":"సక్తి",
    "Salem":"సేలమ్",
    "Samastipur":"సమస్తీపూర్",
    "Samba":"సాంబా",
    "Sambalpur":"సంబల్‌పూర్",
    "Sambhal":"సంభల్",
    "Sangareddy":"సంగారెడ్డి",
    "Sangli":"సాంగ్లి",
    "Sangrur":"సంగ్రూర్",
    "Sant Kabir Nagar":"సంత్ కబీర్ నగర్",
    "Saran":"సారన్",
    "Sarangarh Bilaigarh":"సారంగఢ్-బిలాయిగఢ్",
    "Satara":"సతారా",
    "Satna":"సత్నా",
    "Sawai Madhopur":"సవాయి మాధోపూర్",
    "Sehore":"సీహోర్",
    "Senapati":"సేనాపతి",
    "Seoni":"సివని",
    "Sepahijala":"సేపాహిజాలా",
    "Seraikela Kharsawan":"సరాయ్‌కేలా ఖర్సావాన్",
    "Serchhip":"సేర్‌ఛిప్",
    "Shahdara":"షాహ్‌దరా",
    "Shahdol":"షాహ్‌డోల్",
    "Shahjahanpur":"షాహ్‌జహాన్‌పూర్",
    "Shajapur":"షాజాపూర్",
    "Shamator":"షమాటోర్",
    "Shamli":"షామ్లి",
    "Sheikhpura":"షేఖ్‌పురా",
    "Sheohar":"శివహర్",
    "Sheopur":"శ్యోపూర్",
    "Shi Yomi":"షి యోమి",
    "Shimla":"సిమ్లా",
    "Shivamogga":"శివమొగ్గ",
    "Shivpuri":"శివ్‌పురి",
    "Shopian":"షోపియాన్",
    "Shrawasti":"శ్రావస్తి",
    "Siang":"సియాంగ్",
    "Siddharthnagar":"సిద్ధార్థ్‌నగర్",
    "Siddipet":"సిద్దిపేట",
    "Sidhi":"సిధి",
    "Sikar":"సీకర్",
    "Simdega":"సిమ్‌డేగా",
    "Sindhudurg":"సింధుదుర్గ్",
    "Singrauli":"సింగ్రౌలి",
    "Sipahijala":"సిపాహీజాలా",
    "Sirmaur":"సిర్మావుర్",
    "Sirohi":"సిరోహి",
    "Sirsa":"సిర్సా",
    "Sitamarhi":"సీతామఢి",
    "Sitapur":"సీతాపూర్",
    "Sivaganga":"శివగంగ",
    "Sivasagar":"శివసాగర్",
    "Siwan":"సివాన్",
    "Solan":"సోలన్",
    "Solapur":"సోలాపూర్",
    "Sonbhadra":"సోన్‌భద్ర",
    "Sonepur":"సోనేపూర్",
    "Sonipat":"సోనిపట్",
    "Sonitpur":"సోనిత్‌పూర్",
    "Soreng":"సోరేంగ్",
    "South 24 Parganas":"దక్షిణ 24 పరగణాలు",
    "South Delhi":"దక్షిణ ఢిల్లీ",
    "South East Delhi":"ఆగ్నేయ ఢిల్లీ",
    "South Garo Hills":"దక్షిణ గారో హిల్స్",
    "South Goa":"దక్షిణ గోవా",
    "South Salmara-Mankachar":"దక్షిణ సల్మారా-మన్కాచర్",
    "South Sikkim":"దక్షిణ సిక్కిం",
    "South Tripura":"దక్షిణ త్రిపుర",
    "South West Delhi":"దక్షిణ పశ్చిమ ఢిల్లీ",
    "South West Garo Hills":"నైరుతి గారో హిల్స్",
    "South West Khasi Hills":"నైరుతి ఖాసి హిల్స్",
    "Sri Potti Sriramulu Nellore":"శ్రీ పోట్టి శ్రీరాములు నెల్లూరు",
    "Srikakulam":"శ్రీకాకుళం",
    "Srinagar":"శ్రీనగర్",
    "Sukma":"సుక్మా",
    "Sultanpur":"సుల్తాన్‌పూర్",
    "Sundargarh":"సుందర్‌గఢ్",
    "Supaul":"సుపౌల్",
    "Surajpur":"సూరజ్‌పూర్",
    "Surat":"సూరత్",
    "Surendranagar":"సురేంద్రనగర్",
    "Surguja":"సర్గుజా",
    "Suryapet":"సూర్యాపేట",
    "Tamenglong":"తమేంగ్లాంగ్",
    "Tapi":"తాపి",
    "Tarn Taran":"తర్న్ తారాన్",
    "Tawang":"తవాంగ్",
    "Tehri Garhwal":"తేహ్రి గర్వాల్",
    "Tengnoupal":"తేంగ్నౌపాల్",
    "Tenkasi":"తెంకాసి",
    "Thane":"థానే",
    "Thanjavur":"తంజావూరు",
    "Theni":"తేని",
    "Thiruvananthapuram":"తిరువనంతపురం",
    "Thoothukudi":"తూతుకుడి",
    "Thoubal":"థౌబల్",
    "Thrissur":"త్రిస్సూర్",
    "Tikamgarh":"టీకమ్‌గఢ్",
    "Tinsukia":"తిన్సుకియా",
    "Tirap":"తిరప్",
    "Tiruchirappalli":"తిరుచిరాపల్లి",
    "Tirunelveli":"తిరునెల్వేలి",
    "Tirupathur":"తిరుపత్తూర్",
    "Tirupati":"తిరుపతి",
    "Tiruppur":"తిరుప్పూర్",
    "Tiruvallur":"తిరువళ్ళూరు",
    "Tiruvannamalai":"తిరువణ్ణామలై",
    "Tiruvarur":"తిరువారూర్",
    "Tonk":"టోంక్",
    "Tseminyü":"సేమిన్యూ",
    "Tuensang":"తుఎన్సాంగ్",
    "Tumakuru":"తుమకూరు",
    "Udaipur":"ఉదయపూర్",
    "Udalguri":"ఉదాల్‌గురి",
    "Udham Singh Nagar":"ఉధమ్ సింగ్ నగర్",
    "Udhampur":"ఉధమ్‌పూర్",
    "Udupi":"ఉడుపి",
    "Ujjain":"ఉజ్జయిని",
    "Ukhrul":"ఉఖ్రుల్",
    "Umaria":"ఉమారియా",
    "Una":"ఊనా",
    "Unakoti":"ఉనకోటి",
    "Unnao":"ఉన్నావ్",
    "Upper Siang":"ఎగువ సియాంగ్",
    "Upper Subansiri":"ఎగువ సుబాన్‌సిరి",
    "Uttar Dinajpur":"ఉత్తర దినాజ్‌పూర్",
    "Uttara Kannada":"ఉత్తర కన్నడ",
    "Uttarkashi":"ఉత్తర్‌కాషి",
    "Vadodara":"వడోదర",
    "Vaishali":"వైశాలి",
    "Valsad":"వల్సాడ్",
    "Varanasi":"వారణాసి",
    "Vellore":"వెల్లూరు",
    "Vidisha":"విదిశా",
    "Vijayapura":"విజయపుర",
    "Vikarabad":"వికారాబాద్",
    "Viluppuram":"విలుప్పురం",
    "Virudhunagar":"విరుధుపట్టు",
    "Visakhapatnam":"విశాఖపట్నం",
    "Vizianagaram":"విజయనగరం",
    "Wanaparthy":"వనపర్తి",
    "Warangal":"వరంగల్",
    "Wardha":"వర్ధా",
    "Washim":"వాషిం",
    "Wayanad":"వాయనాడ్",
    "West Champaran":"పశ్చిమ చంపారణ్",
    "West Delhi":"పశ్చిమ ఢిల్లీ",
    "West Garo Hills":"పశ్చిమ గారో హిల్స్",
    "West Godavari":"పశ్చిమ గోదావరి",
    "West Jaintia Hills":"పశ్చిమ జయంతియా హిల్స్",
    "West Kameng":"పశ్చిమ కమేంగ్",
    "West Karbi Anglong":"పశ్చిమ కార్బి ఆంగ్లాంగ్",
    "West Khasi Hills":"పశ్చిమ ఖాసి హిల్స్",
    "West Siang":"పశ్చిమ సియాంగ్",
    "West Sikkim":"పశ్చిమ సిక్కిం",
    "West Singhbhum":"పశ్చిమ సింగ్‌భూమ్",
    "West Tripura":"పశ్చిమ త్రిపుర",
    "Wokha":"వొఖా",
    "Yadadri Bhuvanagiri":"యాదాద్రి భువనగిరి",
    "Yadgir":"యాదగిర్",
    "Yamunanagar":"యమునానగర్",
    "Yanam":"యానం",
    "Yavatmal":"యవత్మాల్",
    "Zunheboto":"జున్‌హేబోటో"
  },
  ta: {
    "Adilabad":"ஆதிலாபாத்",
    "Agar Malwa":"ஆகர் மால்வா",
    "Agra":"ஆக்ரா",
    "Ahmedabad":"அகமதாபாத்",
    "Ahmednagar":"அகமத்நகர்",
    "Aizawl":"ஐஸ்வால்",
    "Ajmer":"அஜ்மேர்",
    "Akola":"அகோலா",
    "Alappuzha":"ஆலப்புழா",
    "Aligarh":"அலிகர்",
    "Alipurduar":"அலிபூர்துவார்",
    "Alirajpur":"அலிராஜ்பூர்",
    "Allahabad":"அலஹாபாத்",
    "Almora":"அல்மோரா",
    "Alwar":"அல்வார்",
    "Ambala":"அம்பாலா",
    "Ambedkar Nagar":"அம்பேத்கர் நகர்",
    "Amethi":"அமேத்தி",
    "Amravati":"அமராவதி",
    "Amreli":"அம்ரேலி",
    "Amritsar":"அம்ரிட்சர்",
    "Amroha":"அம்ரோஹா",
    "Anand":"ஆனந்த்",
    "Anantapur":"அனந்தபூர்",
    "Anantnag":"அனந்தநாக்",
    "Angul":"அங்கூல்",
    "Anjaw":"அஞ்சாவ்",
    "Anuppur":"அனுப்பூர்",
    "Araria":"அரேரியா",
    "Aravalli":"அரவல்லி",
    "Ariyalur":"அரியலூர்",
    "Arwal":"அர்வல்",
    "Ashoknagar":"அசோக்நகர்",
    "Auraiya":"ஔரையா",
    "Aurangabad":"ஔரங்காபாத்",
    "Ayodhya":"அயோத்தியா",
    "Azamgarh":"ஆஜம்கட்",
    "Bagalkote":"பாகல்கோட்",
    "Bageshwar":"பாகேஸ்வர்",
    "Baghpat":"பாக்பத்",
    "Bahraich":"பஹ்ராய்ச்",
    "Bajali":"பஜாலி",
    "Baksa":"பக்சா",
    "Balaghat":"பாலாகாட்",
    "Balangir":"பலாங்கீர்",
    "Balasore":"பாலசோர்",
    "Ballari":"பல்லாரி",
    "Ballia":"பல்லியா",
    "Balod":"பாலோட்",
    "Baloda Bazar":"பலோதா பஜார்",
    "Balrampur":"பல்ராம்பூர்",
    "Banaskantha":"பனஸ்கந்தா",
    "Banda":"பாண்டா",
    "Bandipora":"பந்திபோரா",
    "Banka":"பாங்கா",
    "Bankura":"பங்கூரா",
    "Banswara":"பன்ஸ்வாரா",
    "Bapatla":"பாபட்லா",
    "Barabanki":"பாராபங்கி",
    "Baramulla":"பாராமுல்லா",
    "Baran":"பாரான்",
    "Bareilly":"பரேலி",
    "Bargarh":"பர்கட்",
    "Barmer":"பார்மேர்",
    "Barnala":"பர்னாலா",
    "Barpeta":"பார்பேட்டா",
    "Barwani":"பர்வானி",
    "Bastar":"பஸ்தர்",
    "Basti":"பஸ்தி",
    "Bathinda":"பதிண்டா",
    "Beed":"பீட்",
    "Begusarai":"பேகூசாரை",
    "Belagavi":"பெல்காம்",
    "Bemetara":"பேமேத்ரா",
    "Bengaluru Rural":"பெங்களூரு கிராமப்புறம்",
    "Bengaluru Urban":"பெங்களூரு நகரம்",
    "Betul":"பேட்டுல்",
    "Bhadradri Kothagudem":"பத்ரேஸ்வரி கோட்டகுடெம்",
    "Bhadrak":"பத்ரக்",
    "Bhagalpur":"பாகல்பூர்",
    "Bhandara":"பண்டாரா",
    "Bharatpur":"பரத்பூர்",
    "Bharuch":"பரூச்",
    "Bhavnagar":"பாவ்நகர்",
    "Bhilwara":"பீல்வாரா",
    "Bhind":"பிண்ட்",
    "Bhiwani":"பிவானி",
    "Bhojpur":"போஜ்பூர்",
    "Bhopal":"போபால்",
    "Bidar":"பீதர்",
    "Bijapur":"பீஜாபூர்",
    "Bijnor":"பிஜ்நோர்",
    "Bikaner":"பிகானேர்",
    "Bilaspur":"பிலாஸ்பூர்",
    "Birbhum":"பீர்பூம்",
    "Bishnupur":"பிஷ்ணுபூர்",
    "Biswanath":"பிஸ்வநாத்",
    "Bokaro":"போக்காரோ",
    "Bongaigaon":"பொங்காய்காவ்",
    "Botad":"போட்டாட்",
    "Boudh":"பௌத்",
    "Budaun":"பதாயூன்",
    "Budgam":"பட்காம்",
    "Bulandshahr":"புலந்த்சஹர்",
    "Buldhana":"புல்தானா",
    "Bundi":"புண்டி",
    "Burhanpur":"புர்ஹான்பூர்",
    "Buxar":"பக்சர்",
    "Cachar":"காச்சார்",
    "Central Delhi":"மத்திய தில்லி",
    "Chamarajanagar":"சாமராஜ்நகர்",
    "Chamba":"சம்பா",
    "Chamoli":"சமோலி",
    "Champawat":"சம்பாவத்",
    "Champhai":"சம்பை",
    "Chandauli":"சந்தோலி",
    "Chandel":"சந்தேல்",
    "Chandrapur":"சந்திரபூர்",
    "Changlang":"சாங்லாங்",
    "Charaideo":"சராய்தேவ்",
    "Charkhi Dadri":"சர்கி தாத்ரி",
    "Chatra":"சத்ரா",
    "Chengalpattu":"செங்கல்பட்டு",
    "Chennai":"சென்னை",
    "Chhatarpur":"சத்தர்பூர்",
    "Chhindwara":"சிந்துவாரா",
    "Chhota Udaipur":"சோட்டா உதய்பூர்",
    "Chikkaballapura":"சிக்கபல்லாபுரா",
    "Chikkamagaluru":"சிக்கமகளூரு",
    "Chirang":"சிராங்",
    "Chitradurga":"சித்ரதுர்கா",
    "Chitrakoot":"சித்ரகூட்",
    "Chittoor":"சித்தூர்",
    "Chittorgarh":"சித்தோர்கட்",
    "Chumoukedima":"சுமௌகேதிமா",
    "Churachandpur":"சுராசந்திர்பூர்",
    "Churu":"சுரு",
    "Coimbatore":"கோயம்புத்தூர்",
    "Cooch Behar":"கூச் பிஹார்",
    "Cuddalore":"கடலூர்",
    "Cuttack":"கட்டக்",
    "Dahod":"தாஹோட்",
    "Dakshin Dinajpur":"தட்சிண திநாஜ்பூர்",
    "Dakshina Kannada":"தட்சிண கன்னட",
    "Damoh":"தமோஹ்",
    "Dang":"டாங்",
    "Dantewada":"தந்தேவாடா",
    "Darbhanga":"தர்பங்கா",
    "Darjeeling":"தார்ஜிலிங்",
    "Darrang":"தாரங்",
    "Datia":"தாத்தியா",
    "Dausa":"தௌசா",
    "Davanagere":"தாவணகெரே",
    "Dehradun":"தேஹ்ராதூன்",
    "Deogarh":"தேவ்கட்",
    "Deoghar":"தேவகர்",
    "Deoria":"தேவரியா",
    "Devbhoomi Dwarka":"தேவபூமி துவாரகா",
    "Dewas":"தேவாஸ்",
    "Dhalai":"தலாய்",
    "Dhamtari":"தாம்தரி",
    "Dhanbad":"தன்பாத்",
    "Dhar":"தார்",
    "Dharmapuri":"தர்மபுரி",
    "Dharwad":"தார்வாட்",
    "Dhemaji":"தேமாஜி",
    "Dhenkanal":"தென்கனால்",
    "Dholpur":"தோல்பூர்",
    "Dhubri":"துப்ரி",
    "Dhule":"துலே",
    "Dibang Valley":"திபாங் பள்ளத்தாக்கு",
    "Dibrugarh":"திப்ருகட்",
    "Dima Hasao":"டிமா ஹாசாவ்",
    "Dimapur":"டிமாபூர்",
    "Dindigul":"திண்டுக்கல்",
    "Dindori":"டிண்டோரி",
    "Doda":"டோடா",
    "Dumka":"டும்கா",
    "Dungarpur":"டூங்கர்பூர்",
    "Durg":"துர்க்",
    "East Champaran":"கிழக்கு சம்பாரண்",
    "East Delhi":"கிழக்கு தில்லி",
    "East Garo Hills":"கிழக்கு காரோ மலைகள்",
    "East Godavari":"கிழக்கு கோதாவரி",
    "East Jaintia Hills":"கிழக்கு ஜைந்திய மலைகள்",
    "East Kameng":"கிழக்கு காமேங்",
    "East Khasi Hills":"கிழக்கு காசி மலைகள்",
    "East Siang":"கிழக்கு சியாங்",
    "East Sikkim":"கிழக்கு சிக்கிம்",
    "East Singhbhum":"கிழக்கு சிங்பூம்",
    "Eastern West Khasi Hills":"கிழக்கு மேற்கு காசி மலைகள்",
    "Eluru":"ஏலூரு",
    "Ernakulam":"எர்ணாகுளம்",
    "Erode":"ஈரோடு",
    "Etah":"ஏட்டா",
    "Etawah":"இட்டாவா",
    "Faridabad":"பரீதாபாத்",
    "Faridkot":"பரீத்கோட்",
    "Farrukhabad":"பர்ருக்காபாத்",
    "Fatehabad":"பதேஹாபாத்",
    "Fatehgarh Sahib":"பதேஹ்கட் சாகிப்",
    "Fatehpur":"பதேஹ்பூர்",
    "Fazilka":"பாஜில்கா",
    "Ferozepur":"பீரோஜ்பூர்",
    "Firozabad":"பீரோஜாபாத்",
    "Gadag":"கதக்",
    "Gadchiroli":"கட்சிரோலி",
    "Gajapati":"காஜபதி",
    "Ganderbal":"கந்தர்பால்",
    "Gandhinagar":"காந்திநகர்",
    "Ganganagar":"கங்கா நகர்",
    "Ganjam":"கஞ்சாம்",
    "Garhwa":"கட்வா",
    "Gariaband":"கரியாபந்த்",
    "Gaurela Pendra Marwahi":"கௌரேலா-பேந்ரா-மர்வாஹி",
    "Gautam Buddha Nagar":"கௌதம் புத்த நகர்",
    "Gaya":"கயா",
    "Ghaziabad":"காஜியாபாத்",
    "Ghazipur":"காஜிபூர்",
    "Gir Somnath":"கிர் சோம்நாத்",
    "Giridih":"கிரிடீஹ்",
    "Goalpara":"கோல்பாரா",
    "Godda":"கொட்டா",
    "Golaghat":"கோலாகட்",
    "Gomati":"கோமதி",
    "Gonda":"கோண்டா",
    "Gondia":"கோண்டியா",
    "Gopalganj":"கோபால்கஞ்ச்",
    "Gorakhpur":"கோரக்பூர்",
    "Gumla":"குமிலா",
    "Guna":"குனா",
    "Guntur":"குண்டூர்",
    "Gurdaspur":"குர்தாஸ்பூர்",
    "Gurugram":"குருகிராம்",
    "Gwalior":"குவாலியர்",
    "Hailakandi":"ஹைலாகண்டி",
    "Hamirpur":"ஹமீர்பூர்",
    "Hanumakonda":"அனுமகொண்டா",
    "Hanumangarh":"அனுமான்கட்",
    "Hapur":"ஹாபுர்",
    "Harda":"ஹர்தா",
    "Hardoi":"ஹர்தோய்",
    "Haridwar":"ஹரித்வார்",
    "Hassan":"ஹாசன்",
    "Hathras":"ஹாத்ராஸ்",
    "Haveri":"ஹாவேரி",
    "Hazaribagh":"ஹஜாரிபாக்",
    "Hingoli":"ஹிங்கோலி",
    "Hisar":"ஹிசார்",
    "Hnahthial":"நாத்தியல்",
    "Hojai":"ஹோஜை",
    "Hooghly":"ஹூக்லி",
    "Hoshangabad":"ஹோஷங்காபாத்",
    "Hoshiarpur":"ஹோஷியார்பூர்",
    "Howrah":"ஹவ்ரா",
    "Hyderabad":"ஐதராபாத்",
    "Idukki":"இடுக்கி",
    "Imphal East":"இம்பால் கிழக்கு",
    "Imphal West":"இம்பால் மேற்கு",
    "Indore":"இந்தூர்",
    "Jabalpur":"ஜாபல்பூர்",
    "Jagatsinghpur":"ஜகத்சிங்பூர்",
    "Jagtial":"ஜக்தியால்",
    "Jaipur":"ஜெய்ப்பூர்",
    "Jaisalmer":"ஜெய்சால்மேர்",
    "Jajpur":"ஜாஜ்பூர்",
    "Jalandhar":"ஜலந்தர்",
    "Jalaun":"ஜாலௌன்",
    "Jalgaon":"ஜல்காவ்",
    "Jalna":"ஜால்னா",
    "Jalore":"ஜாலோர்",
    "Jalpaiguri":"ஜல்பாய்குரி",
    "Jammu":"ஜம்மு",
    "Jamnagar":"ஜாம்நகர்",
    "Jamtara":"ஜாம்தாரா",
    "Jamui":"ஜமுய்",
    "Jangaon":"ஜனகாம்",
    "Janjgir Champa":"ஜாஞ்சீர்-சம்பா",
    "Jashpur":"ஜஷ்பூர்",
    "Jaunpur":"ஜான்பூர்",
    "Jayashankar Bhupalpally":"ஜெயசங்கர் பூபால்பல்லி",
    "Jehanabad":"ஜஹானாபாத்",
    "Jhabua":"ஜாபுவா",
    "Jhajjar":"ஜாஜ்ஜர்",
    "Jhalawar":"ஜாலாவாட்",
    "Jhansi":"ஜான்சி",
    "Jhargram":"ஜார்கிராம்",
    "Jharsuguda":"ஜார்சுகுடா",
    "Jhunjhunu":"ஜுஞ்சுனு",
    "Jind":"ஜிண்ட்",
    "Jiribam":"ஜிரிபாம்",
    "Jodhpur":"ஜோத்பூர்",
    "Jogulamba Gadwal":"ஜோகுலம்பா கட்வால்",
    "Jorhat":"ஜோர்ஹாட்",
    "Junagadh":"ஜூனாகட்",
    "Kabirdham":"கபீர்தாம்",
    "Kadapa":"கடப்பா",
    "Kaimur":"கைமூர்",
    "Kaithal":"கைத்தால்",
    "Kakching":"காக்சிங்",
    "Kakinada":"காகிநாடா",
    "Kalaburagi":"கலபுர்கி",
    "Kalahandi":"கலாஹண்டி",
    "Kalimpong":"காலிம்பாங்",
    "Kallakurichi":"கல்லக்குறிச்சி",
    "Kamareddy":"காமாரெட்டி",
    "Kamjong":"காம்ஜாங்",
    "Kamle":"காம்லே",
    "Kamrup":"காம்ரூப்",
    "Kamrup Metropolitan":"காம்ரூப் மெட்ரோ",
    "Kancheepuram":"காஞ்சிபுரம்",
    "Kandhamal":"கந்தமால்",
    "Kangpokpi":"காங்பொக்பி",
    "Kangra":"காங்ரா",
    "Kanker":"காங்கேர்",
    "Kannauj":"கன்னோஜ்",
    "Kanniyakumari":"கன்னியாகுமரி",
    "Kannur":"கண்ணூர்",
    "Kanpur Dehat":"கான்பூர் தேஹாத்",
    "Kanpur Nagar":"கான்பூர் நகர்",
    "Kapurthala":"கபூர்தலா",
    "Karaikal":"காரைக்கால்",
    "Karauli":"கரௌலி",
    "Karbi Anglong":"கார்பி ஆங்லாங்",
    "Kargil":"கார்கில்",
    "Karimganj":"கரீம்கஞ்ச்",
    "Karimnagar":"கரீம்நகர்",
    "Karnal":"கர்னால்",
    "Karur":"கரூர்",
    "Kasaragod":"காசர்கோட்",
    "Kasganj":"காஸ்கஞ்ச்",
    "Kathua":"கட்துவா",
    "Katihar":"கட்டிஹார்",
    "Katni":"கட்னி",
    "Kaushambi":"கௌசாம்பி",
    "Kendrapara":"கேந்திரபரா",
    "Kendujhar":"கேந்துஜார்",
    "Khagaria":"காகரியா",
    "Khairagarh":"கைராகட்",
    "Khammam":"காம்மம்",
    "Khandwa":"கண்ட்வா",
    "Khargone":"கர்கோன்",
    "Khawzawl":"காவ்ஸாவல்",
    "Kheda":"கேதா",
    "Khordha":"கோர்தா",
    "Khowai":"கோவாய்",
    "Khunti":"குண்டி",
    "Kinnaur":"கின்னோர்",
    "Kiphire":"கிப்ஹிரே",
    "Kishanganj":"கிஷன்கஞ்ச்",
    "Kishtwar":"கிஷ்த்வார்",
    "Kodagu":"கொடகு",
    "Koderma":"கோடர்மா",
    "Kohima":"கோஹிமா",
    "Kokrajhar":"கோக்ராஜார்",
    "Kolar":"கோலார்",
    "Kolasib":"கோலாசிப்",
    "Kolhapur":"கோல்ஹாபூர்",
    "Kolkata":"கொல்கத்தா",
    "Kollam":"கொல்லம்",
    "Konaseema":"கோனசீமா",
    "Kondagaon":"கொண்டாகாவ்",
    "Koppal":"கோப்பல்",
    "Koraput":"கோராபுட்",
    "Korba":"கோர்பா",
    "Koriya":"கோரியா",
    "Kota":"கோட்டா",
    "Kottayam":"கோட்டயம்",
    "Kozhikode":"கோழிக்கோட்",
    "Kra Daadi":"கிரா தாதி",
    "Krishna":"கிருஷ்ணா",
    "Krishnagiri":"கிருஷ்ணகிரி",
    "Kulgam":"குல்காம்",
    "Kullu":"குல்லு",
    "Kumuram Bheem":"குமுரம் பீம்",
    "Kupwara":"குப்வாரா",
    "Kurnool":"கர்நூல்",
    "Kurukshetra":"குருஷேத்ரா",
    "Kurung Kumey":"குருங் குமேய்",
    "Kushinagar":"குஷிநகர்",
    "Kutch":"கட்ச்",
    "Lahaul Spiti":"லாஹுல் ஸ்பிட்டி",
    "Lakhimpur":"லக்கிம்பூர்",
    "Lakhimpur Kheri":"லக்கிம்பூர் கீரி",
    "Lakhisarai":"லகிசரை",
    "Lalitpur":"லலித்பூர்",
    "Latehar":"லாத்தேஹார்",
    "Latur":"லாத்தூர்",
    "Lawngtlai":"லாவங்த்லை",
    "Leh":"லேஹ்",
    "Lepa Rada":"லேபா ராடா",
    "Lohardaga":"லோஹர்தகா",
    "Lohit":"லோஹிட்",
    "Longding":"லாங்டிங்",
    "Longleng":"லாங்லேங்",
    "Lower Dibang Valley":"கீழ் திபாங் பள்ளத்தாக்கு",
    "Lower Siang":"கீழ் சியாங்",
    "Lower Subansiri":"கீழ் சுபான்சிரி",
    "Lucknow":"லக்னோ",
    "Ludhiana":"லூதியானா",
    "Lunglei":"லுங்லேய்",
    "Madhepura":"மதேபுரா",
    "Madhubani":"மதுபனி",
    "Madurai":"மதுரை",
    "Mahabubabad":"மகாபூபாபாத்",
    "Mahabubnagar":"மகாபூப்நகர்",
    "Maharajganj":"மகாராஜ்கஞ்ச்",
    "Mahasamund":"மகாசமுந்த்",
    "Mahe":"மாஹே",
    "Puducherry":"புதுச்சேரி",
    "Mahendragarh":"மகேந்திரகட்",
    "Mahisagar":"மகிசாகர்",
    "Mahoba":"மஹோபா",
    "Mainpuri":"மைன்பூரி",
    "Majuli":"மாஜுலி",
    "Malappuram":"மலப்புரம்",
    "Malda":"மால்தா",
    "Malerkotla":"மாலேர்கோட்லா",
    "Malkangiri":"மல்கான்கிரி",
    "Mamit":"மாமிட்",
    "Mancherial":"மஞ்சேரியல்",
    "Mandi":"மண்டி",
    "Mandla":"மண்ட்லா",
    "Mandsaur":"மந்த்சௌர்",
    "Mandya":"மண்ட்யா",
    "Manendragarh":"மனேந்திரகட்",
    "Mansa":"மான்சா",
    "Mathura":"மதுரா",
    "Mau":"மௌ",
    "Mayiladuthurai":"மயிலாடுதுறை",
    "Mayurbhanj":"மயூர்பஞ்ச்",
    "Medak":"மேடக்",
    "Medchal Malkajgiri":"மேட்சால்-மல்காஜிகிரி",
    "Meerut":"மேரட்",
    "Mehsana":"மேஹ்சானா",
    "Mirzapur":"மிர்ஜாபூர்",
    "Moga":"மோகா",
    "Mohali":"மோஹாலி",
    "Mohla Manpur":"மோஹ்லா-மான்பூர்",
    "Mokokchung":"மோகோக்சுங்",
    "Mon":"மோன்",
    "Moradabad":"முராதாபாத்",
    "Morbi":"மோர்பி",
    "Morena":"முரேனா",
    "Morigaon":"மோரிகாவ்",
    "Muktsar":"முக்தசர்",
    "Mulugu":"முலுகு",
    "Mumbai City":"மும்பை நகரம்",
    "Mumbai Suburban":"மும்பை புறநகர்",
    "Mungeli":"முங்கேலி",
    "Munger":"முங்கேர்",
    "Murshidabad":"முர்ஷிதாபாத்",
    "Muzaffarnagar":"முஜப்பர்நகர்",
    "Muzaffarpur":"முஜப்பர்பூர்",
    "Mysuru":"மைசூரு",
    "NTR":"என்டிஆர் மாவட்டம்",
    "Nabarangpur":"நபரங்கபூர்",
    "Nadia":"நாதியா",
    "Nagaon":"நாகாவ்",
    "Nagapattinam":"நாகப்பட்டினம்",
    "Nagarkurnool":"நாகர்கர்னூல்",
    "Nagaur":"நாகௌர்",
    "Nagpur":"நாக்பூர்",
    "Nainital":"நைனிதால்",
    "Nalanda":"நாளந்தா",
    "Nalbari":"நல்பாரி",
    "Nalgonda":"நல்கொண்டா",
    "Namakkal":"நாமக்கல்",
    "Namsai":"நாம்சாய்",
    "Nanded":"நான்தேட்",
    "Nandurbar":"நந்துர்பார்",
    "Nandyal":"நந்தியால்",
    "Narayanpet":"நாராயண்பேட்",
    "Narayanpur":"நாராயண்பூர்",
    "Narmada":"நர்மதா",
    "Narsinghpur":"நர்சிங்பூர்",
    "Nashik":"நாசிக்",
    "Navsari":"நவ்சாரி",
    "Nawada":"நவாடா",
    "Nawanshahr":"நவான்ஷஹர்",
    "Nayagarh":"நயாகட்",
    "Neemuch":"நீமச்",
    "Nellore":"நெல்லூர்",
    "New Delhi":"புது தில்லி",
    "Nirmal":"நிர்மல்",
    "Niuland":"நியூலாந்து",
    "Niwari":"நிவாரி",
    "Nizamabad":"நிஜாமாபாத்",
    "Noklak":"நோக்லக்",
    "Noney":"நோனி",
    "North 24 Parganas":"வடக்கு 24 பரகனா",
    "North Delhi":"வடக்கு தில்லி",
    "North East Delhi":"வட கிழக்கு தில்லி",
    "North Garo Hills":"வட காரோ மலைகள்",
    "North Goa":"வட கோவா",
    "North Sikkim":"வடக்கு சிக்கிம்",
    "North Tripura":"வட திரிபுரா",
    "North West Delhi":"வட மேற்கு தில்லி",
    "Nuapada":"நுஆபாடா",
    "Nuh":"நூஹ்",
    "Osmanabad":"ஒஸ்மானாபாத்",
    "Pakke Kessang":"பக்கே கேசாங்",
    "Pakur":"பாகூர்",
    "Pakyong":"பாக்யாங்",
    "Palakkad":"பாலக்காட்",
    "Palamu":"பலாமு",
    "Palghar":"பால்கர்",
    "Pali":"பாலி",
    "Palnadu":"பாலனாடு",
    "Palwal":"பால்வால்",
    "Panchkula":"பஞ்சகுலா",
    "Panchmahal":"பஞ்சமகால்",
    "Panipat":"பானிபட்",
    "Panna":"பன்னா",
    "Papum Pare":"பாபும் பாரே",
    "Parbhani":"பர்பணி",
    "Paschim Bardhaman":"மேற்கு பர்த்வான்",
    "Paschim Medinipur":"மேற்கு மேதினிபூர்",
    "Patan":"பாட்டன்",
    "Pathanamthitta":"பத்தனம்திட்டா",
    "Pathankot":"பத்தான்கோட்",
    "Patiala":"பட்டியாலா",
    "Patna":"பாட்னா",
    "Pauri Garhwal":"பவுரி கர்வால்",
    "Peddapalli":"பெட்டபல்லி",
    "Perambalur":"பெரம்பலூர்",
    "Peren":"பேரேன்",
    "Phek":"பேக்",
    "Pherzawl":"பேர்ஜவல்",
    "Pilibhit":"பீலிபித்",
    "Pithoragarh":"பிட்டோராகட்",
    "Poonch":"பூஞ்ச்",
    "Porbandar":"போர்பந்தர்",
    "Prakasam":"பிரகாசம்",
    "Pratapgarh":"பிரதாப்கட்",
    "Pudukkottai":"புதுக்கோட்டை",
    "Pulwama":"புல்வாமா",
    "Pune":"புனே",
    "Purba Bardhaman":"கிழக்கு பர்த்வான்",
    "Purba Medinipur":"கிழக்கு மேதினிபூர்",
    "Puri":"பூரி",
    "Purnia":"பூர்ணியா",
    "Purulia":"புருலியா",
    "Raebareli":"ராய் பரேலி",
    "Raichur":"ராய்ச்சூர்",
    "Raigad":"ரய்கட்",
    "Raigarh":"ராய்கட்",
    "Raipur":"ராய்பூர்",
    "Raisen":"ராய்சேன்",
    "Rajanna Sircilla":"ராஜன்னா சிர்சில்லா",
    "Rajgarh":"ராஜ்கட்",
    "Rajkot":"ராஜ்கோட்",
    "Rajnandgaon":"ராஜ்நந்த்காவ்",
    "Rajsamand":"ராஜ்சமந்த்",
    "Ramanagara":"ராமநகர்",
    "Ramanathapuram":"ராமநாதபுரம்",
    "Ramban":"ராம்பன்",
    "Ramgarh":"ராம்கட்",
    "Rampur":"ராம்பூர்",
    "Ranchi":"ராஞ்சி",
    "Rangareddy":"ரங்காரெட்டி",
    "Ranipet":"ராணிப்பேட்",
    "Ratlam":"ரத்லாம்",
    "Ratnagiri":"ரத்னகிரி",
    "Rayagada":"ராயகடா",
    "Reasi":"ரியாசி",
    "Rewa":"ரேவா",
    "Rewari":"ரேவாரி",
    "Ri Bhoi":"ரி போய்",
    "Rohtak":"ரோஹ்தக்",
    "Rohtas":"ரோஹ்தாஸ்",
    "Rudraprayag":"ருத்ரப்பிரயாக்",
    "Rupnagar":"ரூப்நகர்",
    "Sabarkantha":"சாபர்கந்தா",
    "Sagar":"சாகர்",
    "Saharanpur":"சஹாரன்பூர்",
    "Saharsa":"சஹர்சா",
    "Sahebganj":"சாஹேப்கஞ்ச்",
    "Saiha":"சியாஹா",
    "Saitual":"சைதுவல்",
    "Sakti":"சக்தி",
    "Salem":"சேலம்",
    "Samastipur":"சமஸ்திபூர்",
    "Samba":"சம்பா",
    "Sambalpur":"சம்பல்பூர்",
    "Sambhal":"சம்பல்",
    "Sangareddy":"சங்காரெட்டி",
    "Sangli":"சாங்லி",
    "Sangrur":"சங்ரூர்",
    "Sant Kabir Nagar":"சந்த் கபீர் நகர்",
    "Saran":"சாரண்",
    "Sarangarh Bilaigarh":"சாரங்கட்-பிலாய்கட்",
    "Satara":"சதாரா",
    "Satna":"சத்னா",
    "Sawai Madhopur":"சவாய் மாதோபூர்",
    "Sehore":"சீஹோர்",
    "Senapati":"சேனாபதி",
    "Seoni":"சிவனி",
    "Sepahijala":"செபாஹிஜாலா",
    "Seraikela Kharsawan":"சரைகேலா கர்சாவன்",
    "Serchhip":"சேர்ச்சிப்",
    "Shahdara":"ஷாஹ்தரா",
    "Shahdol":"ஷாட்தோல்",
    "Shahjahanpur":"ஷாஜஹான்பூர்",
    "Shajapur":"ஷாஜாபூர்",
    "Shamator":"ஷாமாட்டோர்",
    "Shamli":"ஷாம்லி",
    "Sheikhpura":"ஷேக்பூரா",
    "Sheohar":"சிவஹர்",
    "Sheopur":"ஷியோபூர்",
    "Shi Yomi":"ஷி யோமி",
    "Shimla":"சிம்லா",
    "Shivamogga":"சிவமொக்கா",
    "Shivpuri":"சிவபூரி",
    "Shopian":"ஷோப்பியான்",
    "Shrawasti":"ஸ்ரீ ஷ்ராவஸ்தி",
    "Siang":"சியாங்",
    "Siddharthnagar":"சித்தார்த்நகர்",
    "Siddipet":"சித்திபேட்",
    "Sidhi":"சீதி",
    "Sikar":"சீகர்",
    "Simdega":"சிம்தேகா",
    "Sindhudurg":"சிந்துதுர்க்",
    "Singrauli":"சிங்ரௌலி",
    "Sipahijala":"சிபாஹீஜாலா",
    "Sirmaur":"சிர்மௌர்",
    "Sirohi":"சிரோஹி",
    "Sirsa":"சிர்சா",
    "Sitamarhi":"சீதாமரி",
    "Sitapur":"சீதாபூர்",
    "Sivaganga":"சிவகங்கை",
    "Sivasagar":"சிவசாகர்",
    "Siwan":"சிவான்",
    "Solan":"சோலன்",
    "Solapur":"சோலாபூர்",
    "Sonbhadra":"சோன்பத்ரா",
    "Sonepur":"சோனேபூர்",
    "Sonipat":"சோனிபட்",
    "Sonitpur":"சோனிட்பூர்",
    "Soreng":"சொரேங்",
    "South 24 Parganas":"தெற்கு 24 பரகனா",
    "South Delhi":"தெற்கு தில்லி",
    "South East Delhi":"தென் கிழக்கு தில்லி",
    "South Garo Hills":"தெற்கு காரோ மலைகள்",
    "South Goa":"தென் கோவா",
    "South Salmara-Mankachar":"தெற்கு சல்மாரா-மன்காசர்",
    "South Sikkim":"தெற்கு சிக்கிம்",
    "South Tripura":"தெற்கு திரிபுரா",
    "South West Delhi":"தென் மேற்கு தில்லி",
    "South West Garo Hills":"தென்மேற்கு காரோ மலைகள்",
    "South West Khasi Hills":"தென்மேற்கு காசி மலைகள்",
    "Sri Potti Sriramulu Nellore":"ஸ்ரீ பொட்டி ஸ்ரீராமுலு நெல்லூர்",
    "Srikakulam":"ஸ்ரீகாகுளம்",
    "Srinagar":"ஸ்ரீநகர்",
    "Sukma":"சுக்மா",
    "Sultanpur":"சுல்தான்பூர்",
    "Sundargarh":"சுந்தர்கட்",
    "Supaul":"சுபௌல்",
    "Surajpur":"சூரஜ்பூர்",
    "Surat":"சூரத்",
    "Surendranagar":"சுரேந்திரநகர்",
    "Surguja":"சர்குஜா",
    "Suryapet":"சூரியபேட்",
    "Tamenglong":"தாமேங்லோங்",
    "Tapi":"தாப்பி",
    "Tarn Taran":"தர்ன் தாரன்",
    "Tawang":"தவாங்",
    "Tehri Garhwal":"தேஹ்ரி கர்வால்",
    "Tengnoupal":"தேங்நௌபால்",
    "Tenkasi":"தென்காசி",
    "Thane":"தானே",
    "Thanjavur":"தஞ்சாவூர்",
    "Theni":"தேனி",
    "Thiruvananthapuram":"திருவனந்தபுரம்",
    "Thoothukudi":"தூத்துக்குடி",
    "Thoubal":"தௌபால்",
    "Thrissur":"திருச்சூர்",
    "Tikamgarh":"திகம்கட்",
    "Tinsukia":"திண்சுகியா",
    "Tirap":"திரப்",
    "Tiruchirappalli":"திருச்சிராப்பள்ளி",
    "Tirunelveli":"திருநெல்வேலி",
    "Tirupathur":"திருப்பத்தூர்",
    "Tirupati":"திருப்பதி",
    "Tiruppur":"திருப்பூர்",
    "Tiruvallur":"திருவள்ளூர்",
    "Tiruvannamalai":"திருவண்ணாமலை",
    "Tiruvarur":"திருவாரூர்",
    "Tonk":"டோங்க்",
    "Tseminyü":"செமின்யூ",
    "Tuensang":"துயென்சாங்",
    "Tumakuru":"துமக்கூரு",
    "Udaipur":"உதய்பூர்",
    "Udalguri":"உதல்குரி",
    "Udham Singh Nagar":"உதம் சிங் நகர்",
    "Udhampur":"உதம்பூர்",
    "Udupi":"உடுப்பி",
    "Ujjain":"உஜ்ஜைன்",
    "Ukhrul":"உக்ரூல்",
    "Umaria":"உமாரியா",
    "Una":"ஊனா",
    "Unakoti":"உனகோட்டி",
    "Unnao":"உன்னாவ்",
    "Upper Siang":"மேல் சியாங்",
    "Upper Subansiri":"மேல் சுபான்சிரி",
    "Uttar Dinajpur":"வடக்கு திநாஜ்பூர்",
    "Uttara Kannada":"உத்தர கன்னட",
    "Uttarkashi":"உத்தர்காசி",
    "Vadodara":"வடோதரா",
    "Vaishali":"வைசாலி",
    "Valsad":"வல்சாட்",
    "Varanasi":"வாரணாசி",
    "Vellore":"வேலூர்",
    "Vidisha":"விதிஷா",
    "Vijayapura":"விஜயபுரா",
    "Vikarabad":"விகாராபாத்",
    "Viluppuram":"விழுப்புரம்",
    "Virudhunagar":"விருதுநகர்",
    "Visakhapatnam":"விசாகப்பட்டினம்",
    "Vizianagaram":"விஜயநகரம்",
    "Wanaparthy":"வனப்பர்தி",
    "Warangal":"வாரங்கல்",
    "Wardha":"வர்தா",
    "Washim":"வாஷிம்",
    "Wayanad":"வயநாடு",
    "West Champaran":"மேற்கு சம்பாரண்",
    "West Delhi":"மேற்கு தில்லி",
    "West Garo Hills":"மேற்கு காரோ மலைகள்",
    "West Godavari":"மேற்கு கோதாவரி",
    "West Jaintia Hills":"மேற்கு ஜைந்திய மலைகள்",
    "West Kameng":"மேற்கு காமேங்",
    "West Karbi Anglong":"மேற்கு கார்பி ஆங்லாங்",
    "West Khasi Hills":"மேற்கு காசி மலைகள்",
    "West Siang":"மேற்கு சியாங்",
    "West Sikkim":"மேற்கு சிக்கிம்",
    "West Singhbhum":"மேற்கு சிங்பூம்",
    "West Tripura":"மேற்கு திரிபுரா",
    "Wokha":"வோக்கா",
    "Yadadri Bhuvanagiri":"யாதாத்ரி புவனகிரி",
    "Yadgir":"யாத்கீர்",
    "Yamunanagar":"யமுனாநகர்",
    "Yanam":"யானம்",
    "Yavatmal":"யவத்மால்",
    "Zunheboto":"சுன்ஹேபோட்டோ"
  }
};
// Returns district name in user's language (falls back to English)
function getDistrictName(englishName, lang) {
  if (!englishName) return "";
  if (!lang || lang === "en") return englishName;
  return (DISTRICTS_NATIVE[lang] && DISTRICTS_NATIVE[lang][englishName]) || englishName;
}

function getStateName(englishName, lang) {
  if (!englishName) return "";
  if (!lang || lang === "en") return englishName;
  return (T[lang] && T[lang].states && T[lang].states[englishName]) || (T.en && T.en.states && T.en.states[englishName]) || englishName;
}

// Lat/lon for districts — used by Open-Meteo weather API
const DISTRICT_COORDS = {
  "Hyderabad":["Telangana",17.38,78.49],
  "Ranga Reddy":["Telangana",17.36,78.49],
  "Rangareddy":["Telangana",17.24,78.4],
  "Medchal Malkajgiri":["Telangana",17.57,78.66],
  "Sangareddy":["Telangana",17.62,78.09],
  "Medak":["Telangana",18.05,78.27],
  "Mahbubnagar":["Telangana",16.74,77.98],
  "Mahabubnagar":["Telangana",16.74,77.98],
  "Warangal":["Telangana",17.97,79.6],
  "Karimnagar":["Telangana",18.43,79.13],
  "Nizamabad":["Telangana",18.67,78.09],
  "Khammam":["Telangana",17.25,80.15],
  "Nalgonda":["Telangana",17.05,79.26],
  "Adilabad":["Telangana",19.67,78.53],
  "Hanamkonda":["Telangana",17.97,79.58],
  "Medchal":["Telangana",17.63,78.53],
  "Shamshabad":["Telangana",17.24,78.4],
  "Kompally":["Telangana",17.54,78.49],
  "LB Nagar":["Telangana",17.35,78.55],
  "Secunderabad":["Telangana",17.44,78.5],
  "Kothagudem":["Telangana",17.56,80.61],
  "Annamayya":["Andhra Pradesh",13.87,79.06],
  "Chittoor":["Andhra Pradesh",13.22,79.1],
  "Guntur":["Andhra Pradesh",16.3,80.44],
  "Krishna":["Andhra Pradesh",16.7,80.89],
  "Kurnool":["Andhra Pradesh",15.83,78.04],
  "Nellore":["Andhra Pradesh",14.45,79.98],
  "Prakasam":["Andhra Pradesh",15.33,79.55],
  "Srikakulam":["Andhra Pradesh",18.3,83.9],
  "Visakhapatnam":["Andhra Pradesh",17.68,83.22],
  "Vizianagaram":["Andhra Pradesh",18.12,83.4],
  "East Godavari":["Andhra Pradesh",17.0,82.0],
  "West Godavari":["Andhra Pradesh",16.91,81.33],
  "Kadapa":["Andhra Pradesh",14.47,78.82],
  "Tirupati":["Andhra Pradesh",13.63,79.42],
  "Eluru":["Andhra Pradesh",16.71,81.09],
  "NTR":["Andhra Pradesh",16.51,80.62],
  "Anantapur":["Andhra Pradesh",14.68,77.60],
  "Nandyal":["Andhra Pradesh",15.47,78.49],
  "Bapatla":["Andhra Pradesh",15.90,80.46],
  "Kakinada":["Andhra Pradesh",16.98,82.25],
  "Sri Potti Sriramulu Nellore":["Andhra Pradesh",14.45,79.98],
  "Palnadu":["Andhra Pradesh",16.43,79.65],
  "Konaseema":["Andhra Pradesh",16.90,81.80],
  "Chennai":["Tamil Nadu",13.08,80.27],
  "Coimbatore":["Tamil Nadu",11.02,76.96],
  "Dharmapuri":["Tamil Nadu",12.13,78.16],
  "Erode":["Tamil Nadu",11.34,77.73],
  "Kancheepuram":["Tamil Nadu",12.84,79.7],
  "Karur":["Tamil Nadu",10.96,78.08],
  "Krishnagiri":["Tamil Nadu",12.52,78.21],
  "Madurai":["Tamil Nadu",9.93,78.12],
  "Nagapattinam":["Tamil Nadu",10.76,79.84],
  "Namakkal":["Tamil Nadu",11.22,78.17],
  "Pudukkottai":["Tamil Nadu",10.38,78.82],
  "Salem":["Tamil Nadu",11.66,78.15],
  "Thanjavur":["Tamil Nadu",10.78,79.13],
  "Thiruvannamalai":["Tamil Nadu",12.23,79.07],
  "Thiruchirappalli":["Tamil Nadu",10.8,78.69],
  "Thiruvarur":["Tamil Nadu",10.77,79.64],
  "Vellore":["Tamil Nadu",12.92,79.13],
  "Villupuram":["Tamil Nadu",11.94,79.49],
  "Cuddalore":["Tamil Nadu",11.75,79.77],
  "Ariyalur":["Tamil Nadu",11.14,79.08],
  "Dindigul":["Tamil Nadu",10.36,77.97],
  "Tiruppur":["Tamil Nadu",11.11,77.34],
  "Thoothukudi":["Tamil Nadu",8.76,78.13],
  "Tirunelveli":["Tamil Nadu",8.73,77.7],
  "Lucknow":["Uttar Pradesh",26.85,80.95],
  "Agra":["Uttar Pradesh",27.18,78.01],
  "Varanasi":["Uttar Pradesh",25.31,83.01],
  "Kanpur Nagar":["Uttar Pradesh",26.46,80.33],
  "Meerut":["Uttar Pradesh",28.98,77.71],
  "Gorakhpur":["Uttar Pradesh",26.76,83.37],
  "Prayagraj":["Uttar Pradesh",25.44,81.84],
  "Gautam Buddha Nagar":["Uttar Pradesh",28.57,77.39],
  "Bulandshahar":["Uttar Pradesh",28.41,77.83],
  "Sambhal":["Uttar Pradesh",28.58,78.57],
  "Hathras":["Uttar Pradesh",27.6,78.05],
  "Badaun":["Uttar Pradesh",28.03,79.12],
  "Banda":["Uttar Pradesh",25.47,80.34],
  "Lakhimpur":["Uttar Pradesh",27.95,80.78],
  "Balrampur":["Uttar Pradesh",27.43,82.18],
  "Mathura":["Uttar Pradesh",27.49,77.67],
  "Bareilly":["Uttar Pradesh",28.37,79.43],
  "Moradabad":["Uttar Pradesh",28.83,78.77],
  "Saharanpur":["Uttar Pradesh",29.97,77.55],
  "Muzaffarnagar":["Uttar Pradesh",29.47,77.7],
  "Ayodhya":["Uttar Pradesh",26.79,82.19],
  "Jhansi":["Uttar Pradesh",25.45,78.57],
  "Aligarh":["Uttar Pradesh",27.88,78.08],
  "Ghaziabad":["Uttar Pradesh",28.67,77.43],
  "Pilibhit":["Uttar Pradesh",28.63,79.8],
  "Kolkata":["West Bengal",22.57,88.36],
  "Howrah":["West Bengal",22.59,88.29],
  "Murshidabad":["West Bengal",24.18,88.27],
  "Darjeeling":["West Bengal",27.03,88.26],
  "North 24 Parganas":["West Bengal",22.86,88.39],
  "Paschim Bardhaman":["West Bengal",23.23,87.07],
  "Alipurduar":["West Bengal",26.49,89.53],
  "Uttar Dinajpur":["West Bengal",25.62,88.12],
  "Hooghly":["West Bengal",22.9,88.39],
  "Bhopal":["Madhya Pradesh",23.25,77.41],
  "Indore":["Madhya Pradesh",22.72,75.86],
  "Jabalpur":["Madhya Pradesh",23.18,79.94],
  "Gwalior":["Madhya Pradesh",26.22,78.18],
  "Ujjain":["Madhya Pradesh",23.18,75.78],
  "Sagar":["Madhya Pradesh",23.83,78.73],
  "Satna":["Madhya Pradesh",24.58,80.83],
  "Vidisha":["Madhya Pradesh",23.52,77.81],
  "Rewa":["Madhya Pradesh",24.53,81.3],
  "Badwani":["Madhya Pradesh",21.93,74.23],
  "Betul":["Madhya Pradesh",21.9,77.9],
  "Seoni":["Madhya Pradesh",22.08,79.55],
  "Jhabua":["Madhya Pradesh",22.77,74.59],
  "Tikamgarh":["Madhya Pradesh",24.74,78.83],
  "Ahmedabad":["Gujarat",23.03,72.58],
  "Rajkot":["Gujarat",22.3,70.78],
  "Surat":["Gujarat",21.17,72.83],
  "Vadodara":["Gujarat",22.3,73.19],
  "Anand":["Gujarat",22.56,72.95],
  "Gandhinagar":["Gujarat",23.22,72.68],
  "Bhavnagar":["Gujarat",21.76,72.15],
  "Jamnagar":["Gujarat",22.47,70.06],
  "Junagadh":["Gujarat",21.52,70.46],
  "Mehsana":["Gujarat",23.59,72.39],
  "Kutch":["Gujarat",23.73,69.86],
  "Kheda":["Gujarat",22.75,72.68],
  "Gurugram":["Haryana",28.47,77.03],
  "Gurgaon":["Haryana",28.47,77.03],
  "Faridabad":["Haryana",28.41,77.31],
  "Hisar":["Haryana",29.15,75.72],
  "Hissar":["Haryana",29.15,75.72],
  "Rohtak":["Haryana",28.89,76.59],
  "Ambala":["Haryana",30.38,76.78],
  "Karnal":["Haryana",29.69,76.99],
  "Panipat":["Haryana",29.39,76.97],
  "Rewari":["Haryana",28.19,76.62],
  "Chandigarh":["Haryana",30.73,76.78],
  "Panchkula":["Haryana",30.69,76.86],
  "Mohali":["Haryana",30.7,76.72],
  "Amritsar":["Punjab",31.63,74.87],
  "Ludhiana":["Punjab",30.9,75.85],
  "Jalandhar":["Punjab",31.33,75.58],
  "Patiala":["Punjab",30.34,76.39],
  "Bathinda":["Punjab",30.21,74.95],
  "Gurdaspur":["Punjab",32.03,75.4],
  "Faridkot":["Punjab",30.67,74.75],
  "Sangrur":["Punjab",30.25,75.84],
  "Hoshiarpur":["Punjab",31.53,75.91],
  "Tarntaran":["Punjab",31.45,74.93],
  "Shimla":["Himachal Pradesh",31.1,77.17],
  "Mandi":["Himachal Pradesh",31.71,76.93],
  "Kullu":["Himachal Pradesh",31.95,77.11],
  "Kangra":["Himachal Pradesh",32.1,76.27],
  "Solan":["Himachal Pradesh",30.91,77.1],
  "Hamirpur":["Himachal Pradesh",31.68,76.52],
  "Una":["Himachal Pradesh",31.47,76.27],
  "Thiruvananthapuram":["Kerala",8.52,76.94],
  "Ernakulam":["Kerala",9.98,76.29],
  "Kozhikode":["Kerala",11.25,75.78],
  "Thrissur":["Kerala",10.52,76.21],
  "Malappuram":["Kerala",11.07,76.07],
  "Kollam":["Kerala",8.89,76.61],
  "Kottayam":["Kerala",9.59,76.52],
  "Palakkad":["Kerala",10.77,76.65],
  "Alappuzha":["Kerala",9.49,76.33],
  "Idukki":["Kerala",9.91,76.97],
  "Pathanamthitta":["Kerala",9.26,76.78],
  "Kannur":["Kerala",11.87,75.37],
  "Bhubaneswar":["Odisha",20.3,85.82],
  "Cuttack":["Odisha",20.46,85.88],
  "Sambalpur":["Odisha",21.47,83.97],
  "Dhenkanal":["Odisha",20.66,85.6],
  "Puri":["Odisha",19.81,85.83],
  "Balangir":["Odisha",20.7,83.49],
  "Ganjam":["Odisha",19.39,84.98],
  "Keonjhar":["Odisha",21.62,85.58],
  "Mayurbhanj":["Odisha",21.93,86.73],
  "Sundargarh":["Odisha",22.12,84.03],
  "Agartala":["Tripura",23.84,91.28],
  "Gomati":["Tripura",23.07,91.27],
  "West Tripura":["Tripura",23.84,91.28],
  "South Tripura":["Tripura",23.26,91.55],
  "Jaipur":["Rajasthan",26.91,75.79],
  "Jodhpur":["Rajasthan",26.29,73.02],
  "Udaipur":["Rajasthan",24.57,73.69],
  "Ajmer":["Rajasthan",26.45,74.64],
  "Kota":["Rajasthan",25.18,75.85],
  "Bikaner":["Rajasthan",28.01,73.32],
  "Alwar":["Rajasthan",27.56,76.61],
  "Sikar":["Rajasthan",27.61,75.14],
  "Barmer":["Rajasthan",25.75,71.41],
  "Mumbai City":["Maharashtra",19.07,72.87],
  "Mumbai Suburban":["Maharashtra",19.17,72.98],
  "Pune":["Maharashtra",18.52,73.86],
  "Nagpur":["Maharashtra",21.15,79.08],
  "Nashik":["Maharashtra",20.0,73.78],
  "Aurangabad":["Maharashtra",19.88,75.33],
  "Solapur":["Maharashtra",17.69,75.9],
  "Kolhapur":["Maharashtra",16.69,74.23],
  "Ahmednagar":["Maharashtra",19.09,74.74],
  "Jalgaon":["Maharashtra",21.0,75.57],
  "Latur":["Maharashtra",18.4,76.56],
  "Nanded":["Maharashtra",19.15,77.32],
  "Thane":["Maharashtra",19.22,72.98],
  "Satara":["Maharashtra",17.68,74.0],
  "Amravati":["Maharashtra",20.93,77.75],
  "Bengaluru Urban":["Karnataka",12.97,77.59],
  "Mysuru":["Karnataka",12.3,76.65],
  "Dharwad":["Karnataka",15.45,75.01],
  "Belagavi":["Karnataka",15.85,74.5],
  "Dakshina Kannada":["Karnataka",12.87,74.84],
  "Tumakuru":["Karnataka",13.34,77.1],
  "Shivamogga":["Karnataka",13.93,75.56],
  "Davanagere":["Karnataka",14.47,75.92],
  "Kalaburagi":["Karnataka",17.33,76.82],
  "Ballari":["Karnataka",15.14,76.93],
  "Raichur":["Karnataka",16.2,77.36],
  "Koppal":["Karnataka",15.35,76.15],
  "Patna":["Bihar",25.6,85.14],
  "Gaya":["Bihar",24.8,85.0],
  "Muzaffarpur":["Bihar",26.12,85.39],
  "Bhagalpur":["Bihar",25.24,86.98],
  "Darbhanga":["Bihar",26.15,85.9],
  "Begusarai":["Bihar",25.42,86.13],
  "Samastipur":["Bihar",25.87,85.78],
  "Nalanda":["Bihar",25.0,85.44],
  "Purnia":["Bihar",25.77,87.47],
  "Guwahati":["Assam",26.14,91.74],
  "Kamrup Metropolitan":["Assam",26.1,91.7],
  "Kamrup":["Assam",26.3,91.45],
  "Dibrugarh":["Assam",27.47,94.91],
  "Jorhat":["Assam",26.75,94.22],
  "Sonitpur":["Assam",26.63,92.8],
  "Nagaon":["Assam",26.35,92.68],
  "Dehradun":["Uttarakhand",30.32,78.03],
  "Haridwar":["Uttarakhand",29.95,78.16],
  "Nainital":["Uttarakhand",29.38,79.46],
  "Udham Singh Nagar":["Uttarakhand",28.99,79.51],
  "Pauri Garhwal":["Uttarakhand",30.14,78.77],
  "Tehri Garhwal":["Uttarakhand",30.39,78.48],
  "Raipur":["Chhattisgarh",21.25,81.63],
  "Bilaspur":["Chhattisgarh",22.09,82.15],
  "Durg":["Chhattisgarh",21.19,81.28],
  "Korba":["Chhattisgarh",22.35,82.68],
  "Rajnandgaon":["Chhattisgarh",21.09,81.03],
  "Surguja":["Chhattisgarh",23.11,83.2],
  "Ranchi":["Jharkhand",23.36,85.33],
  "Dhanbad":["Jharkhand",23.8,86.45],
  "Bokaro":["Jharkhand",23.67,86.15],
  "Giridih":["Jharkhand",24.18,86.3],
  "Hazaribagh":["Jharkhand",23.99,85.36],
  "East Singhbhum":["Jharkhand",22.81,86.18],
};

const PRICES = {
  // National averages — data.gov.in API + Bowenpally APMC — Mar 15 2026
  // MSP 2024-25 from Ministry of Agriculture
  Tomato:   {modal:1200, min:800,  max:2000,msp:0,    trend:"down",arrivals:"HIGH"},
  Onion:    {modal:1400, min:800,  max:2500,msp:0,    trend:"flat",arrivals:"NORMAL"},
  Potato:   {modal:800,  min:450,  max:1300,msp:0,    trend:"down",arrivals:"HIGH"},
  Rice:     {modal:2658, min:2140, max:3100,msp:2300, trend:"up",  arrivals:"NORMAL"},
  Wheat:    {modal:2490, min:2150, max:2720,msp:2275, trend:"flat",arrivals:"NORMAL"},
  Maize:    {modal:1600, min:1400, max:1900,msp:2090, trend:"flat",arrivals:"NORMAL"},
  Cotton:   {modal:7081, min:6500, max:8000,msp:7121, trend:"up",  arrivals:"LOW"},
  Groundnut:{modal:5800, min:4500, max:7000,msp:6783, trend:"flat",arrivals:"NORMAL"},
  Chilli:   {modal:2200, min:1300, max:5000,msp:0,    trend:"down",arrivals:"NORMAL"},
  Soybean:  {modal:4300, min:3800, max:5200,msp:4892, trend:"down",arrivals:"NORMAL"},
  Garlic:   {modal:1500, min:800,  max:16000,msp:0,   trend:"up",  arrivals:"LOW"},
  Ginger:   {modal:7000, min:5000, max:10000,msp:0,   trend:"flat",arrivals:"NORMAL"},
  Brinjal:  {modal:1200, min:700,  max:2000,msp:0,    trend:"flat",arrivals:"NORMAL"},
  Banana:   {modal:2500, min:1800, max:5000,msp:0,    trend:"flat",arrivals:"NORMAL"},
  Mustard:  {modal:6350, min:5800, max:7000,msp:5650, trend:"up",  arrivals:"NORMAL"},
};

const WEATHER = {
  days:[
    {temp:31,tempMax:31,tempMin:24,rain:10,wind:12,humidity:65,uv:7,icon:"cloud"},
    {temp:33,tempMax:33,tempMin:25,rain:5, wind:10,humidity:58,uv:9,icon:"sun"},
    {temp:27,tempMax:27,tempMin:22,rain:85,wind:18,humidity:82,uv:3,icon:"rain"},
    {temp:26,tempMax:26,tempMin:21,rain:70,wind:15,humidity:78,uv:4,icon:"rain"},
    {temp:29,tempMax:29,tempMin:23,rain:30,wind:11,humidity:70,uv:6,icon:"cloud"},
    {temp:32,tempMax:32,tempMin:24,rain:8, wind:9, humidity:62,uv:8,icon:"sun"},
    {temp:30,tempMax:30,tempMin:23,rain:20,wind:13,humidity:68,uv:5,icon:"cloud"},
  ],
  harvestRisk:true,
};

const STORAGE = {
  Tomato:   {shelf:{en:"5-7 days",hi:"5-7 दिन",te:"5-7 రోజులు",ta:"5-7 நாட்கள்"},   moisture:"HIGH_RISK", days:7,
    tip:{en:"Sell quickly. Extremely perishable.",hi:"जल्दी बेचें। बहुत जल्दी खराब होता है।",te:"త్వరగా అమ్మండి. చాలా తొందరగా పాడవుతుంది.",ta:"விரைவாக விற்கவும். மிகவும் விரைவாக கெடும்."}},
  Onion:    {shelf:{en:"3-6 months",hi:"3-6 महीने",te:"3-6 నెలలు",ta:"3-6 மாதங்கள்"}, moisture:"LOW_RISK",  days:180,
    tip:{en:"Dry curing extends shelf life significantly.",hi:"सुखाने से शेल्फ लाइफ बढ़ती है।",te:"ఎండబెట్టడం వల్ల నిల్వ కాలం పెరుగుతుంది.",ta:"காய வைப்பதால் சேமிப்பு காலம் நீடிக்கும்."}},
  Rice:     {shelf:{en:"12-18 months",hi:"12-18 महीने",te:"12-18 నెలలు",ta:"12-18 மாதங்கள்"},   moisture:"MEDIUM",    days:540,
    tip:{en:"Keep moisture below 14% in sealed bags.",hi:"बंद बोरों में नमी 14% से कम रखें।",te:"మూసిన సంచుల్లో తేమ 14% కంటే తక్కువగా ఉంచండి.",ta:"மூடிய பைகளில் ஈரப்பதம் 14% க்கும் குறைவாக வைக்கவும்."}},
  Wheat:    {shelf:{en:"12-24 months",hi:"12-24 महीने",te:"12-24 నెలలు",ta:"12-24 மாதங்கள்"},   moisture:"LOW_RISK",  days:720,
    tip:{en:"Hermetic storage bags ideal for long term.",hi:"हर्मेटिक बैग लंबे समय के लिए आदर्श।",te:"హెర్మెటిక్ బ్యాగులు దీర్ఘకాల నిల్వకు అనుకూలం.",ta:"ஹெர்மெட்டிக் பைகள் நீண்ட கால சேமிப்பிற்கு சிறந்தது."}},
  Maize:    {shelf:{en:"6-12 months",hi:"6-12 महीने",te:"6-12 నెలలు",ta:"6-12 மாதங்கள்"},    moisture:"MEDIUM",    days:365,
    tip:{en:"Dry to 13% moisture before storage.",hi:"भंडारण से पहले 13% नमी तक सुखाएं।",te:"నిల్వకు ముందు 13% తేమకు ఎండబెట్టండి.",ta:"சேமிப்பிற்கு முன் 13% ஈரப்பதத்திற்கு காய வைக்கவும்."}},
  Cotton:   {shelf:{en:"6-12 months",hi:"6-12 महीने",te:"6-12 నెలలు",ta:"6-12 மாதங்கள்"},    moisture:"LOW_RISK",  days:365,
    tip:{en:"Keep in bales, away from moisture.",hi:"गट्ठरों में रखें, नमी से दूर।",te:"బేళ్ళలో ఉంచండి, తేమకు దూరంగా.",ta:"கட்டுகளில் வைக்கவும், ஈரப்பதத்திலிருந்து விலக்கி வைக்கவும்."}},
  Groundnut:{shelf:{en:"4-6 months",hi:"4-6 महीने",te:"4-6 నెలలు",ta:"4-6 మాసాలు"}, moisture:"HIGH_RISK", days:150,
    tip:{en:"Aflatoxin risk — store cool and dry.",hi:"एफ्लाटॉक्सिन खतरा — ठंडा और सूखा रखें।",te:"అఫ్లాటాక్సిన్ ప్రమాదం — చల్లగా మరియు పొడిగా నిల్వ చేయండి.",ta:"அஃப்லாடாக்சின் ஆபத்து — குளிர்ச்சியாகவும் உலர்வாகவும் சேமிக்கவும்."}},
  Chilli:   {shelf:{en:"6-12 months",hi:"6-12 महीने",te:"6-12 నెలలు",ta:"6-12 மாதங்கள்"},    moisture:"MEDIUM",    days:300,
    tip:{en:"Dry completely before storage to prevent mould.",hi:"फफूंद से बचने के लिए पूरी तरह सुखाएं।",te:"అచ్చు నివారించడానికి పూర్తిగా ఎండబెట్టండి.",ta:"பூஞ்சை தடுக்க முழுமையாக காய வைக்கவும்."}},
  Potato:   {shelf:{en:"3-5 months",hi:"3-5 महीने",te:"3-5 నెలలు",ta:"3-5 மாதங்கள்"}, moisture:"HIGH_RISK", days:120,
    tip:{en:"Cold storage at 4°C extends shelf life.",hi:"4°C पर कोल्ड स्टोरेज से शेल्फ लाइफ बढ़ती है।",te:"4°C వద్ద కోల్డ్ స్టోరేజ్ నిల్వ కాలాన్ని పెంచుతుంది.",ta:"4°C-ல் குளிர் சேமிப்பு, சேமிப்பு காலத்தை நீட்டிக்கும்."}},
  Soybean:  {shelf:{en:"6-12 months",hi:"6-12 महीने",te:"6-12 నెలలు",ta:"6-12 மாதங்கள்"},    moisture:"LOW_RISK",  days:300,
    tip:{en:"Ideal moisture: 12%. Keep from direct sunlight.",hi:"आदर्श नमी 12%। सीधी धूप से दूर रखें।",te:"ఆదర్శ తేమ: 12%. నేరుగా సూర్యకాంతికి దూరంగా ఉంచండి.",ta:"சிறந்த ஈரப்பதம்: 12%. நேரடி சூரிய ஒளியிலிருந்து விலக்கி வைக்கவும்."}},
  Garlic:   {shelf:{en:"6-8 months",hi:"6-8 महीने",te:"6-8 నెలలు",ta:"6-8 மாதங்கள்"},
             tip:{en:"Store in cool dry place with good air circulation.",hi:"अच्छी वायु संचार वाली ठंडी जगह पर रखें।",te:"మంచి గాలి ప్రసరణతో చల్లని పొడి స్థలంలో నిల్వ చేయండి.",ta:"நல்ல காற்று சுழற்சி உள்ள குளிர்ந்த இடத்தில் சேமிக்கவும்."}},
  Ginger:   {shelf:{en:"2-3 weeks",hi:"2-3 सप्ताह",te:"2-3 వారాలు",ta:"2-3 வாரங்கள்"},
             tip:{en:"Refrigerate or dry to extend shelf life.",hi:"शेल्फ लाइफ बढ़ाने के लिए रेफ्रिजरेट या सुखाएं।",te:"షెల్ఫ్ లైఫ్ పెంచడానికి రిఫ్రిజిరేట్ చేయండి లేదా ఆరబెట్టండి.",ta:"ஆயுளை நீட்டிக்க குளிரூட்டவும் அல்லது உலர்த்தவும்."}},
  Brinjal:  {shelf:{en:"3-5 days",hi:"3-5 दिन",te:"3-5 రోజులు",ta:"3-5 நாட்கள்"},
             tip:{en:"Store at room temperature away from direct sunlight.",hi:"सीधी धूप से दूर कमरे के तापमान पर रखें।",te:"నేరుగా సూర్యకాంతికి దూరంగా గది ఉష్ణోగ్రత వద్ద నిల్వ చేయండి.",ta:"நேரடி சூரிய ஒளியிலிருந்து விலகி அறை வெப்பநிலையில் சேமிக்கவும்."}},
  Banana:   {shelf:{en:"5-7 days",hi:"5-7 दिन",te:"5-7 రోజులు",ta:"5-7 நாட்கள்"},
             tip:{en:"Store at room temperature. Refrigerate to slow ripening.",hi:"कमरे के तापमान पर रखें। फ्रिज में रखें तो देर से पकते हैं।",te:"గది ఉష్ణోగ్రత వద్ద నిల్వ చేయండి. పండటం నెమ్మదించడానికి రిఫ్రిజిరేట్ చేయండి.",ta:"அறை வெப்பநிலையில் சேமிக்கவும். பழுப்பதை மெதுவாக்க குளிரூட்டவும்."}},
  Mustard:  {shelf:{en:"6-12 months",hi:"6-12 महीने",te:"6-12 నెలలు",ta:"6-12 மாதங்கள்"},
             tip:{en:"Store seeds in airtight containers in a dark cool place.",hi:"बीजों को अंधेरी ठंडी जगह पर एयरटाइट कंटेनर में रखें।",te:"విత్తనాలను చీకటి చల్లని స్థలంలో గాలి దిమ్మె పాత్రలలో నిల్వ చేయండి.",ta:"விதைகளை இருண்ட குளிர்ந்த இடத்தில் காற்று புகாத கொள்கலனில் சேமிக்கவும்."}},
};

const CROP_CALENDAR = {
  Tomato:   {sow:"Jun-Aug, Oct-Nov",harvest:"Oct-Jan, Feb-Apr",bestSell:"Nov-Jan"},
  Onion:    {sow:"Oct-Nov",         harvest:"Feb-Apr",         bestSell:"Apr-Jun"},
  Rice:     {sow:"Jun-Jul",         harvest:"Nov-Dec",         bestSell:"Jan-Mar"},
  Wheat:    {sow:"Oct-Nov",         harvest:"Mar-Apr",         bestSell:"May-Jul"},
  Maize:    {sow:"Jun-Jul",         harvest:"Sep-Oct",         bestSell:"Nov-Dec"},
  Cotton:   {sow:"May-Jun",         harvest:"Oct-Dec",         bestSell:"Jan-Mar"},
  Groundnut:{sow:"Jun-Jul",         harvest:"Oct-Nov",         bestSell:"Dec-Feb"},
  Chilli:   {sow:"Jul-Aug",         harvest:"Dec-Feb",         bestSell:"Feb-Apr"},
  Potato:   {sow:"Oct-Nov",         harvest:"Jan-Mar",         bestSell:"Mar-May"},
  Soybean:  {sow:"Jun-Jul",         harvest:"Sep-Oct",         bestSell:"Nov-Jan"},
  Garlic:   {sow:{en:"Oct-Nov",hi:"अक्तू-नव",te:"అక్టో-నవ",ta:"அக்-நவ"},harvest:{en:"Mar-Apr",hi:"मार्च-अप्रैल",te:"మార్-ఏప్రి",ta:"மார்-ஏப்"},days:150,water:"Low",season:"rabi"},
  Ginger:   {sow:{en:"Feb-Mar",hi:"फर-मार्च",te:"ఫిబ్-మార్",ta:"பிப்-மார்"},harvest:{en:"Nov-Jan",hi:"नव-जन",te:"నవ-జన",ta:"நவ-ஜன"},days:250,water:"Medium",season:"kharif"},
  Brinjal:  {sow:{en:"Jun-Jul",hi:"जून-जुल",te:"జూన్-జుల్",ta:"ஜூன்-ஜூல்"},harvest:{en:"Sep-Jan",hi:"सितं-जन",te:"సెప్-జన",ta:"செப்-ஜன"},days:100,water:"Medium",season:"kharif"},
  Banana:   {sow:{en:"Jun-Jul",hi:"जून-जुल",te:"జూన్-జుల్",ta:"ஜூன்-ஜூல்"},harvest:{en:"Year-round",hi:"साल भर",te:"ఏడాది అంతా",ta:"ஆண்டு முழுவதும்"},days:365,water:"High",season:"kharif"},
  Mustard:  {sow:{en:"Oct-Nov",hi:"अक्तू-नव",te:"అక్టో-నవ",ta:"அக்-நவ"},harvest:{en:"Feb-Mar",hi:"फर-मार्च",te:"ఫిబ్-మార్",ta:"பிப்-மார்"},days:110,water:"Low",season:"rabi"},
};

const SCHEMES = [
  {name:"PM-KISAN",
   desc:{en:"Rs.6000/year direct benefit transfer to farmer families.",hi:"किसान परिवारों को Rs.6000/वर्ष प्रत्यक्ष लाभ हस्तांतरण।",te:"రైతు కుటుంబాలకు Rs.6000/సంవత్సరం నేరుగా బదిలీ.",ta:"விவசாயி குடும்பங்களுக்கு Rs.6000/ஆண்டு நேரடி பலன் பரிமாற்றம்."},
   crops:[]},
  {name:"PMFBY Crop Insurance",
   desc:{en:"Insurance against crop loss from natural calamities.",hi:"प्राकृतिक आपदाओं से फसल नुकसान पर बीमा।",te:"సహజ విపత్తుల వల్ల పంట నష్టానికి బీమా.",ta:"இயற்கை பேரிடர்களால் பயிர் இழப்புக்கு காப்பீடு."},
   crops:["Rice","Wheat","Cotton","Maize","Soybean"]},
  {name:"e-NAM Integration",
   desc:{en:"Digital trading incentive for APMC registered mandis.",hi:"APMC पंजीकृत मंडियों के लिए डिजिटल ट्रेडिंग प्रोत्साहन।",te:"APMC నమోదిత మండీలకు డిజిటల్ ట్రేడింగ్ ప్రోత్సాహం.",ta:"APMC பதிவுசெய்த மண்டிகளுக்கு டிஜிட்டல் வர்த்தக ஊக்கத்தொகை."},
   crops:[]},
  {name:"RKVY Scheme",
   desc:{en:"Infrastructure and input subsidy for farm modernisation.",hi:"खेती आधुनिकीकरण के लिए बुनियादी ढांचा और इनपुट सब्सिडी।",te:"వ్యవసాయ ఆధునికీకరణకు మౌలిక సదుపాయాలు మరియు ఇన్‌పుట్ సబ్సిడీ.",ta:"விவசாய நவீனமயமாக்கலுக்கு உள்கட்டமைப்பு மற்றும் இடுபொருள் மானியம்."},
   crops:[]},
  {name:"Oil Palm Dev. Programme",
   desc:{en:"Incentives for groundnut and oil crop cultivation.",hi:"मूंगफली और तेल फसल की खेती के लिए प्रोत्साहन।",te:"వేరుసెనగ మరియు నూనె పంటల సాగుకు ప్రోత్సాహకాలు.",ta:"கடலை மற்றும் எண்ணெய் பயிர் சாகுபடிக்கு ஊக்கத்தொகை."},
   crops:["Groundnut","Soybean"]},
];

const VEHICLE_EFF = {bike:45, autoV:22, car:14, truck:7};

// Fallback static markets (used while real data loads or if fetch fails)
const getMarkets = (districtName, t, liveMarkets) => {
  if (liveMarkets && liveMarkets.length > 0) return liveMarkets;

  // Real mandi data from agmarknet.gov.in + data.gov.in — actual markets per district
  const KNOWN_MANDIS = {
    // Telangana — from agmarknet.gov.in CSV
    "Hyderabad":    [{name:"Bowenpally APMC",          km:3.2, priceOffset:0,   rating:"BEST",lat:17.45,lon:78.45},
                    {name:"Gudimalkapur APMC",          km:6.8, priceOffset:-50, rating:"GOOD",lat:17.38,lon:78.44},
                    {name:"Hyderabad (F&V) APMC",       km:8.1, priceOffset:50,  rating:"GOOD",lat:17.37,lon:78.48},
                    {name:"Kukatpally RBZ APMC",        km:14.2,priceOffset:-80, rating:"AVG", lat:17.49,lon:78.39}],
    "Ranga Reddy":  [{name:"Shadnagar APMC",            km:4.1, priceOffset:-20, rating:"BEST",lat:17.07,lon:78.21},
                    {name:"Chevella APMC",              km:8.3, priceOffset:-60, rating:"GOOD",lat:17.27,lon:78.14}],
    "Mahbubnagar":  [{name:"Mahabubnagar Rythu Bazar",  km:2.8, priceOffset:0,   rating:"BEST",lat:16.74,lon:77.98},
                    {name:"Devarakadra APMC",           km:9.2, priceOffset:-40, rating:"GOOD",lat:16.69,lon:77.88}],
    "Medak":        [{name:"Sadasivpet APMC",           km:3.5, priceOffset:0,   rating:"BEST",lat:17.61,lon:77.95}],
    "Warangal":     [{name:"Warangal APMC",             km:2.4, priceOffset:0,   rating:"BEST",lat:17.97,lon:79.60}],

    // Andhra Pradesh — from data.gov.in API records
    "Chittoor":     [{name:"Madanapalli APMC",          km:4.2, priceOffset:0,   rating:"BEST",lat:13.55,lon:78.50},
                    {name:"Punganur APMC",              km:12.1,priceOffset:-40, rating:"GOOD",lat:13.36,lon:78.58}],
    "Annamayya":    [{name:"Valmikipuram APMC",         km:5.8, priceOffset:0,   rating:"BEST",lat:13.67,lon:78.97}],
    "Guntur":       [{name:"Guntur APMC",               km:3.1, priceOffset:0,   rating:"BEST",lat:16.31,lon:80.44}],
    "Visakhapatnam":[{name:"Visakhapatnam APMC",        km:4.5, priceOffset:0,   rating:"BEST",lat:17.68,lon:83.22}],

    // Tamil Nadu — from data.gov.in API
    "Coimbatore":   [{name:"Sulur APMC",                km:6.2, priceOffset:0,   rating:"BEST",lat:11.02,lon:77.12},
                    {name:"Udumalpet APMC",             km:18.4,priceOffset:-30, rating:"GOOD",lat:10.58,lon:77.25}],
    "Salem":        [{name:"Vazhapadi APMC",            km:5.1, priceOffset:0,   rating:"BEST",lat:11.62,lon:78.10}],
    "Madurai":      [{name:"Chokkikulam APMC",          km:3.2, priceOffset:0,   rating:"BEST",lat:9.93,lon:78.12},
                    {name:"Anna Nagar APMC",            km:7.4, priceOffset:-20, rating:"GOOD",lat:9.94,lon:78.08}],
    "Dharmapuri":   [{name:"Dharmapuri APMC",           km:2.8, priceOffset:0,   rating:"BEST",lat:12.13,lon:78.16},
                    {name:"Pennagaram APMC",            km:11.2,priceOffset:-40, rating:"GOOD",lat:11.97,lon:77.92}],
    "Erode":        [{name:"Periyar Nagar APMC",        km:4.1, priceOffset:0,   rating:"BEST",lat:11.34,lon:77.73}],
    "Krishnagiri":  [{name:"Krishnagiri APMC",          km:2.5, priceOffset:0,   rating:"BEST",lat:12.52,lon:78.21},
                    {name:"Hosur APMC",                 km:9.8, priceOffset:-30, rating:"GOOD",lat:12.73,lon:77.83}],

    // Uttar Pradesh — from data.gov.in API
    "Lucknow":      [{name:"Banthara APMC",             km:8.4, priceOffset:0,   rating:"BEST",lat:26.74,lon:80.89}],
    "Hathras":      [{name:"Sikandraraau APMC",         km:5.2, priceOffset:0,   rating:"BEST",lat:27.69,lon:78.43},
                    {name:"Shadabad APMC",              km:9.1, priceOffset:-30, rating:"GOOD",lat:27.65,lon:78.33}],
    "Bulandshahar": [{name:"Gulavati APMC",             km:6.3, priceOffset:0,   rating:"BEST",lat:28.52,lon:77.81}],
    "Sambhal":      [{name:"Sambhal APMC",              km:3.8, priceOffset:0,   rating:"BEST",lat:28.58,lon:78.57}],

    // West Bengal
    "Kolkata":      [{name:"Kolaghat APMC",             km:6.1, priceOffset:0,   rating:"BEST",lat:22.57,lon:88.36}],
    "Darjeeling":   [{name:"Siliguri APMC",             km:4.2, priceOffset:0,   rating:"BEST",lat:26.71,lon:88.43},
                    {name:"Darjeeling APMC",            km:8.5, priceOffset:-40, rating:"GOOD",lat:27.03,lon:88.26}],

    // Madhya Pradesh
    "Indore":       [{name:"Indore APMC",               km:3.5, priceOffset:0,   rating:"BEST",lat:22.72,lon:75.86}],
    "Badwani":      [{name:"Anjad APMC",                km:6.2, priceOffset:0,   rating:"BEST",lat:21.84,lon:74.72}],

    // Gujarat
    "Rajkot":       [{name:"Gondal APMC",               km:7.8, priceOffset:0,   rating:"BEST",lat:21.96,lon:70.80}],

    // Haryana
    "Hisar":        [{name:"Barwala APMC",              km:8.1, priceOffset:0,   rating:"BEST",lat:29.37,lon:75.88}],
    "Rohtak":       [{name:"Meham APMC",                km:9.4, priceOffset:0,   rating:"BEST",lat:28.96,lon:76.64}],
    "Panipat":      [{name:"Samalkha APMC",             km:7.2, priceOffset:0,   rating:"BEST",lat:29.22,lon:76.95}],
    "Gurgaon":      [{name:"Gurgaon APMC",              km:4.1, priceOffset:0,   rating:"BEST",lat:28.47,lon:77.03}],

    // Punjab
    "Tarntaran":    [{name:"Tarantaran APMC",           km:2.9, priceOffset:0,   rating:"BEST",lat:31.45,lon:74.93}],

    // Himachal Pradesh
    "Kullu":        [{name:"SMY Bhuntar",               km:5.5, priceOffset:0,   rating:"BEST",lat:31.87,lon:77.14}],

    // Kerala
    "Malappuram":   [{name:"Kottakkal APMC",            km:4.8, priceOffset:0,   rating:"BEST",lat:11.01,lon:75.99}],
    "Kollam":       [{name:"Anchal APMC",               km:6.2, priceOffset:0,   rating:"BEST",lat:8.93,lon:76.83}],
    "Thiruvananthapuram":[{name:"Pappanchani VFPCK APMC",km:7.1,priceOffset:0,   rating:"BEST",lat:8.52,lon:76.94}],

    // Odisha
    "Dhenkanal":    [{name:"Hindol APMC",               km:5.4, priceOffset:0,   rating:"BEST",lat:20.47,lon:85.19}],
  };

  const known = KNOWN_MANDIS[districtName];
  if (known) return known;

  // Generic fallback with correct district name
  return [
    {name:districtName+" APMC",       km:3.2,  priceOffset:0,   rating:"BEST",lat:null,lon:null},
    {name:districtName+" Sub-mandi",  km:9.5,  priceOffset:-80, rating:"GOOD",lat:null,lon:null},
    {name:districtName+" Rythu Bazar",km:15.8, priceOffset:-40, rating:"AVG", lat:null,lon:null},
  ];
};

// Haversine distance between two lat/lon points (km)
const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2-lat1)*Math.PI/180;
  const dLon = (lon2-lon1)*Math.PI/180;
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) * 10) / 10;
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0D1A0F;--surface:#162018;--card:#1E2D20;--border:#2A3E2C;
  --gold:#E8B84B;--green:#4CAF72;--red:#E05252;--amber:#E8943A;
  --blue:#5BA4E8;--cream:#F0EAD6;--muted:#7A9E7E;--text:#E8F0E9;
}
html,body,#root{height:100%;width:100%;margin:0;padding:0;}
body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;}

/* ── ONBOARDING ── full-screen centering on ALL sizes ── */
.onboard-wrap{
  position:fixed;inset:0;z-index:500;
  background:var(--bg);
  display:flex;align-items:center;justify-content:center;
  overflow-y:auto;
}
.onboard{
  width:100%;max-width:430px;min-height:100vh;
  background:var(--bg);
  display:flex;flex-direction:column;
}
.obhero{padding:36px 22px 18px;flex-shrink:0}
.oblogo{font-family:'Bebas Neue',sans-serif;font-size:39px;letter-spacing:3px;color:var(--gold)}
.oblogo span{color:var(--green)}
.obsub{font-size:12px;color:var(--muted);margin-top:4px;letter-spacing:.3px;text-transform:uppercase}
.obtitle{font-size:17px;font-weight:600;color:var(--cream);margin-top:24px;margin-bottom:13px}
.loption{display:flex;align-items:center;gap:12px;padding:13px 14px;background:var(--card);border:1.5px solid var(--border);border-radius:12px;margin-bottom:8px;cursor:pointer;transition:all .2s}
.loption:hover{border-color:var(--gold);background:var(--surface)}
.loption.sel{border-color:var(--gold);background:rgba(232,184,75,.08)}
.lang-card{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px 10px;background:var(--card);border:1.5px solid var(--border);border-radius:12px;cursor:pointer;transition:all .2s;text-align:center;gap:5px}
.lang-card:hover{border-color:var(--gold);background:var(--surface);transform:translateY(-1px)}
.lang-card.sel{border-color:var(--gold);background:rgba(232,184,75,.08)}
.lang-card .lc-flag{font-size:16px;font-weight:800;color:var(--muted);letter-spacing:.5px;font-family:'DM Mono',monospace;line-height:1}
.lang-card.sel .lc-flag{color:var(--gold)}
.lang-card .lc-name{font-size:13px;font-weight:700;color:var(--cream)}
.lang-card.sel .lc-name{color:var(--gold)}
.lang-card .lc-sub{font-size:11px;color:var(--muted)}
.state-card{padding:10px 12px;border-radius:9px;cursor:pointer;border:1.5px solid var(--border);background:var(--card);font-size:12px;font-weight:500;color:var(--text);transition:all .15s;text-align:center}
.state-card:hover{border-color:var(--gold);background:var(--surface);color:var(--cream)}
.state-card.sel{border-color:var(--gold);background:rgba(232,184,75,.08);color:var(--gold);font-weight:700}
.dist-card{padding:9px 11px;border-radius:9px;cursor:pointer;border:1.5px solid var(--border);background:var(--card);font-size:12px;font-weight:500;color:var(--text);transition:all .15s;line-height:1.3}
.dist-card:hover{border-color:var(--gold);background:var(--surface);color:var(--cream)}
.dist-card.sel{border-color:var(--gold);background:rgba(232,184,75,.08);color:var(--gold);font-weight:700}
.lnative{font-size:19px;font-weight:600;color:var(--cream)}
.len{font-size:11px;color:var(--muted);margin-top:1px}
.lcheck{width:20px;height:20px;border-radius:50%;background:var(--green);display:flex;align-items:center;justify-content:center;margin-left:auto;flex-shrink:0}
.obscroll{flex:1;overflow-y:auto;padding:0 22px}
.obscroll::-webkit-scrollbar{width:0}
.shdr2{font-size:10px;text-transform:uppercase;letter-spacing:1.3px;color:var(--muted);padding:7px 0 3px;font-weight:500}
.ditem{padding:10px 12px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text);transition:all .15s;border:1px solid transparent;margin-bottom:2px}
.ditem:hover{background:var(--card);border-color:var(--border)}
.ditem.sel{background:#162018;border-color:var(--green);color:var(--cream)}
.dsearch{display:flex;align-items:center;gap:8px;background:var(--card);border:1px solid var(--border);border-radius:11px;padding:10px 12px;margin-bottom:10px}
.dsearch input{background:none;border:none;outline:none;color:var(--text);font-family:'DM Sans',sans-serif;font-size:13px;flex:1}
.dsearch input::placeholder{color:var(--muted)}
.detectbtn{display:flex;align-items:center;gap:8px;padding:11px 14px;background:rgba(92,164,232,.07);border:1.5px solid rgba(92,164,232,.28);border-radius:10px;cursor:pointer;margin-bottom:10px;font-size:13px;color:var(--blue);transition:all .2s;font-weight:500}
.detectbtn:hover{background:rgba(92,164,232,.13)}

.sel-dot{width:7px;height:7px;border-radius:50%;background:var(--gold);display:inline-block;flex-shrink:0}

.obfooter{padding:13px 22px;flex-shrink:0;border-top:1px solid var(--border)}
.contbtn{width:100%;padding:13px;border-radius:10px;background:var(--gold);color:var(--bg);border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;letter-spacing:.5px;transition:all .2s}
.contbtn:hover{opacity:.88;transform:translateY(-1px)}
.contbtn:disabled{opacity:.35;cursor:not-allowed}

/* ── MAIN APP ── */
.app{width:100%;max-width:430px;margin:0 auto;min-height:100vh;background:var(--bg);display:flex;flex-direction:column;}
.app-body{flex:1;display:flex;overflow:hidden;}
.sidebar{display:none;}
.topbar{padding:12px 15px 10px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);background:var(--bg);position:sticky;top:0;z-index:50;flex-shrink:0;}
.logo{font-family:'Bebas Neue',sans-serif;font-size:23px;letter-spacing:2px;color:var(--gold);line-height:1}
.logo span{color:var(--green)}
.topbar-right{display:flex;align-items:center;gap:7px}
.dist-badge{display:flex;align-items:center;gap:3px;font-size:11px;color:var(--muted);background:var(--card);border:1px solid var(--border);padding:4px 8px;border-radius:20px;cursor:pointer;}
.dist-badge:hover{border-color:var(--gold)}
.icon-btn{width:30px;height:30px;border-radius:50%;background:var(--card);border:1px solid var(--border);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--muted)}
.icon-btn:hover{border-color:var(--gold);color:var(--gold)}
.content{flex:1;overflow-y:auto;padding-bottom:75px;}
.content::-webkit-scrollbar{width:4px}
.content::-webkit-scrollbar-track{background:transparent}
.content::-webkit-scrollbar-thumb{background:var(--border);border-radius:4px}
.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:var(--surface);border-top:1px solid var(--border);display:flex;z-index:100;}
.nav-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 0;cursor:pointer;background:none;border:none;color:var(--muted);font-size:10px;font-family:'DM Sans',sans-serif;transition:color .2s}
.nav-btn.active{color:var(--gold)}
.nav-btn svg{width:18px;height:18px}

/* ── VOICE BUTTONS ── */
.vbtn{
  width:38px;height:38px;border-radius:50%;
  border:2px solid var(--green);
  background:#1A3A22;
  cursor:pointer;display:flex;align-items:center;justify-content:center;
  transition:all .2s;flex-shrink:0;
  color:#E8F0E9;
}
.vbtn:hover{background:#1E4A2A;}
.vbtn.listening{background:var(--green);border-color:var(--green);color:#0D1A0F;animation:pulse 1s infinite}
.vbtn.speak{border-color:var(--gold);background:#3A2E0A;color:#E8F0E9;}
.vbtn.speaking{background:var(--gold);border-color:var(--gold);color:#0D1A0F;}

/* ── CARDS & COMPONENTS ── */
.card{background:var(--card);border:1px solid var(--border);border-radius:13px;padding:14px;margin:0 13px 10px}
.card-title{font-size:10px;text-transform:uppercase;letter-spacing:1.4px;color:var(--muted);margin-bottom:10px;font-weight:500}
.dbanner{margin:12px 13px 9px;border-radius:14px;padding:16px;}
.dbanner.sell{background:linear-gradient(135deg,#1A3A20,#0F2A15);border:1px solid #3A6A42}
.dbanner.wait{background:linear-gradient(135deg,#2A2A1A,#1A1A0A);border:1px solid #5A5A2A}
.dlabel{font-family:'Bebas Neue',sans-serif;font-size:33px;letter-spacing:2px;line-height:1;margin-bottom:3px}
.dbanner.sell .dlabel{color:var(--green)}
.dbanner.wait .dlabel{color:var(--gold)}
.dreason{font-size:12px;color:var(--muted);line-height:1.5}
.dcrop{font-size:10px;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:5px}
.dprice{font-family:'DM Mono',monospace;font-size:24px;color:var(--cream);font-weight:500}
.pgrid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;margin-top:9px}
.pcell{text-align:center}
.pclabel{font-size:9px;color:var(--muted);text-transform:uppercase;letter-spacing:1px}
.pcval{font-family:'DM Mono',monospace;font-size:13px;font-weight:500;margin-top:1px}
.pcval.min{color:var(--red)}.pcval.modal{color:var(--cream);font-size:16px}.pcval.max{color:var(--green)}
.spill{display:inline-flex;align-items:center;gap:3px;padding:3px 8px;border-radius:20px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.5px}
.spill.LOW{background:#1A3A20;color:var(--green);border:1px solid #3A6A42}
.spill.NORMAL{background:#2A2A1A;color:var(--gold);border:1px solid #5A5A2A}
.spill.HIGH{background:#3A1A1A;color:var(--red);border:1px solid #6A3A3A}
.mspill{display:inline-flex;align-items:center;gap:3px;padding:3px 8px;border-radius:20px;font-size:10px;font-weight:600}
.mspill.above{background:#1A3A20;color:var(--green);border:1px solid #3A6A42}
.mspill.near{background:#2A2A1A;color:var(--gold);border:1px solid #5A5A2A}
.mspill.below{background:#3A1A1A;color:var(--red);border:1px solid #6A3A3A}
.trend{display:inline-flex;align-items:center;gap:3px;font-size:11px;font-weight:600}
.trend.up{color:var(--green)}.trend.down{color:var(--red)}.trend.flat{color:var(--muted)}
.swrap{padding:9px 13px;position:sticky;top:54px;z-index:40;background:var(--bg)}
.sbar{display:flex;align-items:center;gap:8px;background:var(--card);border:1px solid var(--border);border-radius:11px;padding:9px 12px}
.sbar input{background:none;border:none;outline:none;color:var(--text);font-family:'DM Sans',sans-serif;font-size:13px;flex:1}
.sbar input::placeholder{color:var(--muted)}
.chips{display:flex;gap:6px;padding:0 13px 9px;overflow-x:auto}
.chips::-webkit-scrollbar{display:none}
.chip{white-space:nowrap;padding:5px 12px;border-radius:20px;font-size:12px;cursor:pointer;border:1px solid var(--border);background:var(--card);color:var(--muted);transition:all .2s}
.chip.active{background:var(--gold);color:var(--bg);border-color:var(--gold);font-weight:600}
.chip:hover:not(.active){border-color:var(--gold);color:var(--cream)}
.mrow{display:flex;align-items:center;gap:9px;padding:10px 0;border-bottom:1px solid var(--border)}
.mrow:last-child{border-bottom:none}
.micon{width:35px;height:35px;border-radius:9px;background:var(--surface);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--muted);flex-shrink:0}
.mname{font-size:13px;font-weight:500}
.mdist{font-size:11px;color:var(--muted);margin-top:1px}
.mprice{font-family:'DM Mono',monospace;font-size:14px;font-weight:500;color:var(--cream)}
.bbadge{font-size:9px;text-transform:uppercase;letter-spacing:.7px;background:var(--green);color:var(--bg);padding:2px 6px;border-radius:20px;font-weight:700}
.wstrip{display:flex;gap:6px;padding:0 13px 9px;overflow-x:auto}
.wstrip::-webkit-scrollbar{display:none}
.wday{min-width:83px;background:var(--card);border:1px solid var(--border);border-radius:11px;padding:10px 8px;text-align:center}
.wday.warn{border-color:var(--red);background:#2A1A1A}
.wdlabel{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.7px;margin-bottom:6px}
.wtemp{font-family:'DM Mono',monospace;font-size:14px;font-weight:500}
.wrain{font-size:10px;color:var(--blue);margin-top:2px}
.ralert{margin:0 13px 9px;background:#2A1A0A;border:1px solid #8A4A10;border-radius:11px;padding:10px 12px;display:flex;align-items:flex-start;gap:8px}
.ralert h4{font-size:12px;font-weight:600;color:var(--amber)}
.ralert p{font-size:11px;color:var(--muted);margin-top:2px}
.shdr{display:flex;align-items:center;justify-content:space-between;padding:10px 13px 6px}
.stitle{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:1.3px;color:var(--cream)}
.sact{font-size:11px;color:var(--gold);cursor:pointer}
.tbar{display:flex;gap:5px;padding:0 13px 9px;overflow-x:auto}
.tbar::-webkit-scrollbar{display:none}
.tab{white-space:nowrap;padding:6px 12px;border-radius:20px;cursor:pointer;font-size:11px;font-weight:500;border:1px solid var(--border);background:var(--card);color:var(--muted);transition:all .2s}
.tab.active{background:var(--gold);color:var(--bg);border-color:var(--gold);font-weight:600}
.gwrap{height:160px;margin-top:6px}
.finput{background:var(--surface);border:1px solid var(--border);border-radius:9px;padding:9px 12px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:13px;width:100%;outline:none;margin-top:5px}
.finput:focus{border-color:var(--gold)}
select.finput{appearance:none;cursor:pointer}
.flabel{font-size:11px;color:var(--muted)}
.est{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.est input{background:none;border:1px solid var(--border);border-radius:8px;padding:7px 9px;color:var(--text);font-family:'DM Mono',monospace;font-size:14px;width:78px;outline:none}
.est input:focus{border-color:var(--gold)}
.estres{font-family:'DM Mono',monospace;font-size:17px;color:var(--green);font-weight:500}
.wrow{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border)}
.wrow:last-child{border-bottom:none}
.sbar2{margin-top:6px;background:var(--surface);border-radius:5px;height:5px;overflow:hidden}
.sbar2f{height:5px;border-radius:5px;background:linear-gradient(90deg,var(--green),var(--gold))}
.sccard{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:8px}
.scname{font-size:13px;font-weight:600;color:var(--cream)}
.scdesc{font-size:11px;color:var(--muted);margin-top:3px;line-height:1.5}
.cgrid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px}
.cbtn{background:var(--surface);border:1px solid var(--border);border-radius:9px;padding:9px;cursor:pointer;text-align:center;font-size:11px;color:var(--muted);transition:all .2s}
.cbtn:hover{border-color:var(--gold);color:var(--cream)}
.cres{background:var(--surface);border:1px solid var(--green);border-radius:9px;padding:12px;margin-top:9px;text-align:center}
.cresval{font-family:'DM Mono',monospace;font-size:21px;color:var(--green)}
.tcard{background:var(--surface);border:1px solid var(--border);border-radius:11px;padding:12px;margin-bottom:8px}
.tcard.best{border-color:var(--green);background:#162018}
.tcard.nogo{border-color:var(--red);opacity:.72}
.tkv{display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid var(--border);font-size:12px}
.tkv:last-child{border-bottom:none}
.tkvk{color:var(--muted)}
.tkvv{font-family:'DM Mono',monospace;font-weight:500}
.tverd{text-align:center;padding:7px;border-radius:7px;font-size:11px;font-weight:700;margin-top:7px;letter-spacing:.5px}
.tverd.go{background:#1A3A20;color:var(--green)}
.tverd.nope{background:#3A1A1A;color:var(--red)}
.lddrop{position:absolute;top:46px;right:0;background:var(--card);border:1px solid var(--border);border-radius:10px;overflow:hidden;z-index:200;min-width:120px;box-shadow:0 8px 24px rgba(0,0,0,.5)}
.lditem{padding:10px 13px;cursor:pointer;font-size:13px;display:flex;align-items:center;gap:7px;transition:background .15s}
.lditem:hover{background:var(--surface)}
.lditem.active{color:var(--gold)}
.empty{text-align:center;padding:30px 20px;color:var(--muted)}
.empty p{font-size:13px;margin-top:8px}
.ctt{background:var(--card);border:1px solid var(--border);border-radius:7px;padding:6px 10px;font-size:11px}
.vtoast{position:fixed;top:66px;left:50%;transform:translateX(-50%);background:var(--card);border:1px solid var(--border);border-radius:9px;padding:7px 15px;font-size:12px;color:var(--cream);z-index:300;pointer-events:none;white-space:nowrap}

/* ── ANIMATIONS ── */
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes fadeSlide{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
.fade-in{animation:fadeSlide .22s ease forwards}

/* ── TABLET ── */
@media(min-width:700px){
  .app{max-width:100%;}
  .topbar{padding:14px 24px;}
  .content{padding-bottom:70px;}
  .bottom-nav{max-width:100%;}
  .card{margin:0 20px 12px;}
  .dbanner{margin:14px 20px 10px;}
  .swrap{padding:10px 20px;}
  .chips{padding:0 20px 10px;}
  .shdr{padding:10px 20px 7px;}
  .tbar{padding:0 20px 10px;}
  .wstrip{padding:0 20px 10px;}
  .ralert{margin:0 20px 10px;}
}

/* ── DESKTOP ── */
@media(min-width:1024px){
  .app{width:100%;max-width:100%;height:100vh;flex-direction:column;overflow:hidden;}
  .topbar{padding:14px 28px;flex-shrink:0;}
  .logo{font-size:26px;}
  .app-body{flex:1;display:flex;overflow:hidden;}
  /* Sidebar */
  .sidebar{display:flex;flex-direction:column;width:220px;flex-shrink:0;background:var(--surface);border-right:1px solid var(--border);padding:22px 0;gap:2px;}
  .sb-btn{display:flex;align-items:center;gap:11px;padding:12px 22px;cursor:pointer;background:none;border:none;color:var(--muted);font-size:14px;font-weight:500;font-family:'DM Sans',sans-serif;border-left:3px solid transparent;transition:all .18s;width:100%;text-align:left;}
  .sb-btn:hover{background:rgba(255,255,255,.04);color:var(--cream);}
  .sb-btn.active{color:var(--gold);border-left-color:var(--gold);background:rgba(232,184,75,.07);}
  .sb-btn svg{width:18px;height:18px;flex-shrink:0;}
  .sb-divider{height:1px;background:var(--border);margin:10px 20px;}
  /* Content */
  .content{flex:1;overflow-y:auto;padding-bottom:28px;}
  .content::-webkit-scrollbar{width:5px}
  /* Hide mobile nav */
  .bottom-nav{display:none;}
  /* Wider content spacing */
  .card{margin:0 28px 14px;}
  .dbanner{margin:16px 28px 12px;}
  .swrap{padding:12px 28px;}
  .chips{padding:0 28px 10px;}
  .shdr{padding:12px 28px 8px;}
  .tbar{padding:0 28px 10px;}
  .ralert{margin:0 28px 10px;}
  .wstrip{padding:0 28px 10px;}
  .gwrap{height:220px;}
  /* Onboarding on desktop — centered modal card */
  .onboard-wrap{background:rgba(13,26,15,.85);backdrop-filter:blur(4px);}
  .onboard{min-height:unset;max-height:88vh;width:480px;max-width:480px;border:1px solid var(--border);border-radius:22px;overflow:hidden;background:var(--surface);box-shadow:0 32px 80px rgba(0,0,0,.7);}
  .obscroll{max-height:calc(88vh - 200px);overflow-y:auto;}
  .obscroll::-webkit-scrollbar{width:3px}
  .obscroll::-webkit-scrollbar-thumb{background:var(--border)}
}
`
const fmtP = function(n) { return Math.round(n).toLocaleString("en-IN"); };

const priceData = function(crop, live) {
  live = live || {};
  var base = PRICES[crop] || {modal:1000,min:800,max:1200,msp:0,trend:"flat",arrivals:"NORMAL",market:"",date:"",history:[],prediction:[],predConfidence:0,priceContext:null};
  var lv = live[crop];
  if (!lv) return Object.assign({history:[],prediction:[],predConfidence:0,priceContext:null}, base, {live:false});
  return {
    modal:          lv.modal    || base.modal,
    min:            lv.min      || base.min,
    max:            lv.max      || base.max,
    msp:            base.msp,
    trend:          lv.trend    || base.trend,
    arrivals:       lv.arrivals || base.arrivals,
    market:         lv.market   || base.market,
    date:           lv.date     || base.date,
    slope:          lv.slope    || 0,
    weekAvg:        lv.weekAvg  || base.modal,
    monthAvg:       lv.monthAvg || base.modal,
    history:        lv.history  || [],
    prediction:     lv.prediction || [],
    predConfidence: lv.predConfidence || 0,
    priceContext:   lv.priceContext   || null,
    live:           true,
  };
};

const getMSP = function(modal, msp, t) {
  if (!msp || msp <= 0) return null;
  var pct = Math.round(((modal - msp) / msp) * 100);
  if (modal >= msp * 1.1) return {cls:"above", label:(t.aboveMSP||"Above MSP")+" +"+pct+"%"};
  if (modal >= msp)       return {cls:"at",    label:(t.nearMSP ||"At MSP")};
  return                         {cls:"below", label:(t.belowMSP||"Below MSP")+" "+pct+"%"};
};

const getDecision = function(crop, t, live, weather) {
  live    = live    || {};
  weather = weather || WEATHER;
  var p   = priceData(crop, live);
  var score = 50;
  if (weather.harvestRisk)             score += 35;
  if (p.trend === "up")               score += 20;
  if (p.trend === "down")             score -= 20;
  if (p.msp > 0 && p.modal >= p.msp)  score += 15;
  if (p.msp > 0 && p.modal  < p.msp)  score -= 20;
  if (p.slope >  100)                 score += 15;
  if (p.slope < -100)                 score -= 15;
  var ctx = p.priceContext;
  if (ctx && ctx.weekChange >  5)     score += 10;
  if (ctx && ctx.weekChange < -5)     score -= 10;
  var pred = p.prediction || [];
  if (pred.length >= 3) score += (pred[pred.length-1].price - pred[0].price) > 0 ? 10 : -10;
  score = Math.max(0, Math.min(100, score));
  if (score >= 65) return {cls:"sell", label:t.sellNow||"SELL", reason:t.reasonSell||"Good time to sell",  score:score};
  if (score >= 45) return {cls:"hold", label:t.wait||"HOLD",    reason:t.reasonWait||"Monitor prices",     score:score};
  return                  {cls:"wait", label:t.wait||"WAIT",    reason:t.reasonWait||"Prices may improve", score:score};
};

const genHist = function(modal, trend, t, liveData, crop, state) {
  if (liveData && liveData.history && liveData.history.length > 3) {
    var h = liveData.history.slice(-21);
    var pr = liveData.prediction || [];
    var metrics = liveData.metrics || {};
    var stdDev = metrics.stdDev || modal * 0.1;
    var out = [];
    for (var i=0; i<h.length; i++) {
      var price = h[i].price;
      var ema7 = metrics.ema7 || price;
      var ema14 = metrics.ema14 || price;
      var upper = price + stdDev * 1.96;
      var lower = Math.max(0, price - stdDev * 1.96);
      out.push({
        day: new Date(h[i].date).toLocaleDateString("en-IN",{day:"numeric",month:"short"}), 
        price: price, 
        ema7: ema7,
        ema14: ema14,
        upper: upper,
        lower: lower,
        predicted: false
      });
    }
    for (var j=0; j<Math.min(7,pr.length); j++) {
      var pPrice = pr[j].price;
      var pUpper = pr[j].upper || pPrice + stdDev * 1.96;
      var pLower = pr[j].lower || Math.max(0, pPrice - stdDev * 1.96);
      out.push({
        day: new Date(pr[j].date).toLocaleDateString("en-IN",{day:"numeric",month:"short"}), 
        price: pPrice, 
        ema7: metrics.ema7 || pPrice,
        ema14: metrics.ema14 || pPrice,
        upper: pUpper,
        lower: pLower,
        predicted: true
      });
    }
    return out;
  }
  var today = new Date(); var result = [];
  for (var k=21; k>=0; k--) {
    var d = new Date(today); d.setDate(today.getDate()-k);
    var noise = (Math.random()-0.5)*modal*0.12;
    var drift = trend==="up"?modal*0.003*(21-k):trend==="down"?-modal*0.003*(21-k):0;
    var price = Math.round(Math.max(100,modal+noise+drift));
    result.push({
      day: d.toLocaleDateString("en-IN",{day:"numeric",month:"short"}), 
      price: price,
      ema7: price,
      ema14: price,
      upper: price * 1.1,
      lower: price * 0.9,
      predicted: false
    });
  }
  return result;
};

const calcTrip = function(km, mktPrice, farmPrice, qty, veh, petrol, laborDays, wage) {
  var eff   = VEHICLE_EFF[veh] || 45;
  var load  = veh==="bike"?2:veh==="autoV"?5:veh==="car"?8:100;
  var trips = Math.ceil(qty/load);
  var fuel  = (km*2*trips/eff)*petrol;
  var labor = laborDays*wage;
  return {cost:Math.round(fuel+labor), revenue:Math.round(qty*mktPrice), net:Math.round(qty*mktPrice-fuel-labor), fuel:Math.round(fuel), labor:Math.round(labor), trips:trips};
};

// ── Price history ──────────────────────────────────────────────
const TRACKED_CROPS = ["Tomato","Onion","Potato","Rice","Wheat","Maize","Cotton","Groundnut","Chilli"];

const SEASONAL = {
  Tomato:{1:0.45,2:0.50,3:0.55,4:0.70,5:0.80,6:1.20,7:1.40,8:1.50,9:1.30,10:1.00,11:0.80,12:0.50},
  Onion: {1:1.10,2:1.30,3:1.40,4:1.20,5:1.00,6:0.80,7:0.70,8:0.75,9:0.85,10:0.90,11:0.95,12:0.90},
  Potato:{1:0.85,2:0.70,3:0.65,4:0.70,5:0.80,6:0.90,7:1.00,8:1.10,9:1.20,10:1.15,11:1.05,12:1.00},
  Rice:  {1:1.00,2:1.00,3:1.00,4:1.02,5:1.05,6:1.08,7:1.06,8:1.04,9:1.00,10:0.98,11:0.99,12:1.00},
  Wheat: {1:1.08,2:1.06,3:1.02,4:0.95,5:0.90,6:0.92,7:0.95,8:0.98,9:1.00,10:1.02,11:1.04,12:1.05},
  Maize: {1:1.00,2:0.98,3:0.96,4:0.95,5:0.95,6:0.97,7:1.00,8:1.02,9:1.05,10:1.03,11:1.01,12:1.00},
  Cotton:{1:1.00,2:1.00,3:1.00,4:0.98,5:0.97,6:0.97,7:0.99,8:1.01,9:1.02,10:1.03,11:1.00,12:0.98},
  Groundnut:{1:1.00,2:1.00,3:0.98,4:0.95,5:0.93,6:0.95,7:0.97,8:1.00,9:1.02,10:1.05,11:1.03,12:1.00},
  Chilli:{1:0.90,2:0.85,3:0.80,4:0.85,5:0.90,6:1.00,7:1.10,8:1.20,9:1.30,10:1.20,11:1.10,12:1.00},
};

const histKey = function(state, crop) {
  return "cm_hist_" + (state||"IN").replace(/\s+/g,"_") + "_" + crop;
};

const loadHistory = function(state, crop) {
  try {
    var raw = localStorage.getItem(histKey(state, crop));
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return [];
};

const saveHistory = function(state, crop, newRecords) {
  try {
    var existing = loadHistory(state, crop);
    var existingDates = {};
    existing.forEach(function(h){ if (!h.seeded) existingDates[h.date] = true; });
    var toAdd = newRecords.filter(function(r){ return r.date && r.price > 0 && !existingDates[r.date]; });
    if (!toAdd.length) return existing;
    var merged = existing.concat(toAdd.map(function(r){ return Object.assign({},r,{seeded:false}); }));
    var byDate = {};
    merged.forEach(function(h){
      if (!byDate[h.date] || (!h.seeded && byDate[h.date].seeded)) byDate[h.date] = h;
    });
    var sorted = Object.values(byDate).filter(function(h){ return h.price>0; })
      .sort(function(a,b){ return a.date.localeCompare(b.date); }).slice(-180);
    localStorage.setItem(histKey(state,crop), JSON.stringify(sorted));
    return sorted;
  } catch(e) { return []; }
};

const predictPrices = function(history, crop, days) {
  days = days || 7;
  if (history.length < 7) return [];
  var real   = (history||[]).filter(function(h){ return !h.seeded; }).slice(-30);
  var all    = history.slice(-30);
  var prices = (real.length >= 5 ? real : all).map(function(h){ return h.price; });
  if (!prices.length) return [];
  var ma7    = prices.slice(-7).reduce(function(a,b){ return a+b; },0) / Math.min(7,prices.length);
  var ma30   = prices.reduce(function(a,b){ return a+b; },0) / prices.length;
  var n      = Math.min(7,prices.length);
  var recent = prices.slice(-n);
  var slope  = n>1 ? (recent[n-1]-recent[0])/(n-1) : 0;
  var damped = slope * 0.3;
  var seasonal = SEASONAL[crop] || {};
  var result = [];
  for (var i=0; i<days; i++) {
    var futureDate = new Date(Date.now()+(i+1)*86400000);
    var m = futureDate.getMonth()+1;
    var sf = seasonal[m] || 1.0;
    var target  = ma30 * sf;
    var blend   = Math.min(0.05*(i+1), 0.4);
    var predicted = Math.round(ma7*(1-blend) + target*blend + damped*(i+1));
    result.push({date:futureDate.toISOString().slice(0,10), price:Math.max(predicted,100), predicted:true});
  }
  return result;
};

const getPriceContext = function(history, currentPrice) {
  if (!history.length || !currentPrice) return null;
  var real = (history||[]).filter(function(h){ return !h.seeded; });
  if (real.length < 2) return null;
  var now = Date.now();
  var weekAgoRec  = real.filter(function(h){ var d=(now-new Date(h.date).getTime())/86400000; return d>=6&&d<=9; })[0];
  var monthAgoRec = real.filter(function(h){ var d=(now-new Date(h.date).getTime())/86400000; return d>=27&&d<=33; })[0];
  var ctx = {};
  if (weekAgoRec) {
    ctx.weekAgo    = weekAgoRec.price;
    ctx.weekChange = Math.round(((currentPrice-weekAgoRec.price)/weekAgoRec.price)*100);
  }
  if (monthAgoRec) {
    ctx.monthAgo    = monthAgoRec.price;
    ctx.monthChange = Math.round(((currentPrice-monthAgoRec.price)/monthAgoRec.price)*100);
  }
  return Object.keys(ctx).length ? ctx : null;
};

const CROP_INTEL = {
  Tomato:{store:"2-3 days room temp, 1 week refrigerated. Sell within 3 days of harvest.",bestMonth:[5,6,7,8,9],icon:"🍅",sellTip:"Prices 40% higher Jun-Sep. Sell before rain."},
  Onion: {store:"6-8 months in cool dry mesh bags.",bestMonth:[1,2,3,4],icon:"🧅",sellTip:"Jan-Apr prices peak. Avoid selling Oct-Nov."},
  Potato:{store:"3-6 months cold storage (2-4°C). Avoid light.",bestMonth:[7,8,9,10],icon:"🥔",sellTip:"Prices peak Aug-Oct. Cold storage triples returns."},
  Rice:  {store:"12-18 months dry airtight bags.",bestMonth:[5,6,7,8],icon:"🌾",sellTip:"Hold 3-4 months post-harvest. Never sell below MSP."},
  Wheat: {store:"12-18 months at 12% moisture.",bestMonth:[9,10,11,12],icon:"🌾",sellTip:"Prices highest Oct-Dec. MSP procurement Apr-Jun."},
  Maize: {store:"6-9 months. Dry to <14% moisture.",bestMonth:[6,7,8,9],icon:"🌽",sellTip:"Prices peak Jun-Sep lean season."},
  Cotton:{store:"12 months in dry bales.",bestMonth:[1,2,3,4],icon:"️",sellTip:"CCI MSP procurement available."},
  Groundnut:{store:"6-12 months. Dry pods to <9% moisture.",bestMonth:[2,3,4,5],icon:"🥜",sellTip:"Oil demand peaks Feb-May."},
  Chilli:{store:"Dry: 12 months. Green: 2-3 weeks refrigerated.",bestMonth:[8,9,10,11],icon:"🌶️",sellTip:"Guntur prices peak Aug-Nov."},
  Garlic:{store:"6-8 months braided in mesh bags.",bestMonth:[5,6,7],icon:"🧄",sellTip:"Prices peak May-Jul before new crop."},
  Ginger:{store:"Fresh: 3-4 weeks refrigerated. Dried: 6+ months.",bestMonth:[9,10,11],icon:"🫚",sellTip:"Sep-Nov prices highest."},
  Brinjal:{store:"5-7 days room temp. Sell within 3 days.",bestMonth:[4,5,6],icon:"🍆",sellTip:"Apr-Jun demand highest. Short shelf life."},
  Banana:{store:"Unripe: 1-3 weeks. Ripen when ready to sell.",bestMonth:[1,2,11,12],icon:"🍌",sellTip:"Festival season (Oct-Jan) prices 30% higher."},
  Mustard:{store:"12-18 months dry airtight.",bestMonth:[9,10,11],icon:"🌻",sellTip:"NAFED MSP procurement Apr-Jun."},
  Soybean:{store:"12 months at <12% moisture.",bestMonth:[3,4,5],icon:"🌱",sellTip:"Prices peak Mar-May before new crop."},
};

const getCropIntel = function(crop) { return CROP_INTEL[crop] || null; };

// ═══════════════════════════════════════════════════════════════
// COMPONENTS  (all Babel-safe: no arrow fns in JSX, no template
// literals in style props, no control chars)
// ═══════════════════════════════════════════════════════════════

function WIcon(props) {
  var type = props.type; var size = props.size || 22;
  if (type === "rain") return React.createElement(CloudRain, {size:size, color:"#5BA4E8"});
  if (type === "sun")  return React.createElement(Sun,       {size:size, color:"#F5C542"});
  return <span style={{fontSize:size*0.9,lineHeight:1}}>&#9925;</span>;
}

// ─── ONBOARDING ───────────────────────────────────────────────

function Onboarding(props) {
  var onDone = props.onDone;
  var s0 = useState("en");      var lang=s0[0],     setLang=s0[1];
  var s1 = useState(0);         var step=s1[0],     setStep=s1[1];
  var s2 = useState("");        var selState=s2[0], setSelState=s2[1];
  var s3 = useState("");        var selDist=s3[0],  setSelDist=s3[1];
  var s4 = useState("idle");    var detect=s4[0],   setDetect=s4[1];
  var s5 = useState("");        var stSrch=s5[0],   setStSrch=s5[1];
  var s6 = useState("");        var dSrch=s6[0],    setDSrch=s6[1];

  var safeLang = LANG_LABELS[lang] ? lang : "en";
  var t  = T[safeLang] || T.en;
  var allStates  = Object.keys(DISTRICTS_BY_STATE).sort();
  var districts  = selState ? (DISTRICTS_BY_STATE[selState]||[]) : [];
  var distLabel = function(d) {
    var n = DISTRICTS_NATIVE&&DISTRICTS_NATIVE[safeLang]&&DISTRICTS_NATIVE[safeLang][d];
    return n ? d+" · "+n : d;
  };
  var stateLabel = function(s){ return getStateName(s,safeLang) || s; };
  var filtStates = allStates.filter(function(s){
    var label = String(stateLabel(s)).toLowerCase();
    var query = String(stSrch || "").toLowerCase();
    return !query || s.toLowerCase().indexOf(query) >= 0 || label.indexOf(query) >= 0;
  });
  var filtDists  = districts.filter(function(d){
    var label = String(distLabel(d)).toLowerCase();
    var query = String(dSrch || "").toLowerCase();
    return !query || d.toLowerCase().indexOf(query) >= 0 || label.indexOf(query) >= 0;
  });
  var finish = function(d) { onDone({lang:lang,district:{name:d,state:selState}}); };

  var handleGPS = function() {
    setDetect("detecting");
    if (!navigator.geolocation) {
      setDetect("idle");
      alert("Geolocation not supported. Please select your state manually.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      function(pos) {
        var lat=pos.coords.latitude, lon=pos.coords.longitude;
        fetch("https://nominatim.openstreetmap.org/reverse?lat="+lat+"&lon="+lon+"&format=json&zoom=8&addressdetails=1&timeout=10",
          {headers:{"Accept-Language":"en","User-Agent":"CropMarketApp/1.0"}})
        .then(function(r){
          if (!r.ok) throw new Error("Nominatim error: "+r.status);
          return r.json();
        })
        .then(function(data){
          var addr=data.address||{};
          var cands=[addr.county,addr.state_district,addr.district,addr.city,addr.town,
              addr.city_district,addr.suburb,addr.village,addr.municipality]
            .filter(Boolean).map(function(s){return s.replace(/ (district|mandal|taluk|taluka|tehsil)$/i,"").trim();});
          var rawSt=addr.state||"";
          var best={score:0,state:"",dist:""};
          allStates.forEach(function(st){
            var stOk=!rawSt||st.toLowerCase().indexOf(rawSt.toLowerCase().slice(0,4))>=0;
            if (!stOk) return;
            (DISTRICTS_BY_STATE[st]||[]).forEach(function(d){
              cands.forEach(function(c){
                var dl=d.toLowerCase(),cl=c.toLowerCase();
                var sc=0;
                if (dl===cl) sc=100;
                else if (dl.replace(/\s/g,"")===cl.replace(/\s/g,"")) sc=95;
                else if (dl.startsWith(cl)||cl.startsWith(dl)) sc=85;
                else if (dl.indexOf(cl)>=0||cl.indexOf(dl)>=0) sc=75;
                else {
                  var dw=dl.split(" "),cw=cl.split(" ");
                  var shared=dw.filter(function(w){return w.length>2&&cw.indexOf(w)>=0;}).length;
                  if (shared>0) sc=50+shared*10;
                }
                if (sc>best.score) best={score:sc,state:st,dist:d};
              });
            });
          });
          if (best.score>=50){setSelState(best.state);setSelDist(best.dist);setDetect("done");setTimeout(function(){finish(best.dist);},500);}
          else if (best.score>0){setSelState(best.state);setStep(2);setDetect("idle");}
          else {setDetect("idle");alert("Could not detect location. Please select manually.");}
        }).catch(function(err){
          console.warn("Location detection error:", err && err.message ? err.message : err);
          setDetect("idle");
          alert("Location detection failed. Please select your state manually.");
        });
      },
      function(err){
        console.warn("Geolocation error:", err && err.message ? err.message : err);
        setDetect("idle");
        alert("Permission denied or location unavailable. Please select your state manually.");
      },
      {timeout:12000,maximumAge:120000,enableHighAccuracy:true}
    );
  };

  return (
    <div className="onboard">
      <div className="obhero">
        <div className="oblogo">Crop<span>Market</span></div>
        <div className="obsub">{t.tagline}</div>
        <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:10}}>
          {[0,1,2].map(function(i){
            return <div key={i} style={{width:i===step?20:6,height:6,borderRadius:3,transition:"all .3s",background:i<=step?"var(--gold)":"rgba(255,255,255,.2)"}}/>;
          })}
        </div>
        <div style={{textAlign:"center",marginTop:8,fontSize:13,fontWeight:600,color:"var(--cream)"}}>
          {step===0?t.chooseLanguage:step===1?t.selectState:t.selectDistrict}
        </div>
        {step===2&&selState&&<div style={{textAlign:"center",fontSize:11,color:"var(--gold)",marginTop:2}}>{stateLabel(selState)}</div>}
      </div>

      <div className="obscroll">
        {step===0&&(
          <div style={{padding:"0 16px 16px"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
              {Object.entries(LANG_LABELS).map(function(entry){
                var code=entry[0],label=entry[1],sel=lang===code;
                return (
                  <div key={code} className={"lang-card"+(sel?" sel":"")} onClick={function(){setLang(code);setSelState("");setSelDist("");setStSrch("");setDSrch("");}}>
                    <div className="lc-flag">{code==="en"?"EN":code==="hi"?"HI":code==="te"?"TE":"TA"}</div>
                    <div className="lc-name">{label}</div>
                    <div className="lc-sub">{code==="en"?"English":code==="hi"?"हिन्दी":code==="te"?"తెలుగు":"தமிழ்"}</div>
                    {sel&&<div className="sel-dot"/>}
                  </div>
                );
              })}
            </div>
            <button className="contbtn" onClick={function(){setStep(1);setSelState("");setSelDist("");setStSrch("");setDSrch("");}}>{t.continueBtn} →</button>
          </div>
        )}

        {step===1&&(
          <div style={{padding:"0 16px 16px"}}>
            <button className="contbtn" style={{background:"var(--surface)",color:"var(--muted)",marginBottom:10}} onClick={function(){setStep(0);setSelState("");setSelDist("");setStSrch("");setDSrch("");}}>
              ← {t.back}
            </button>
            <div className="detectbtn" onClick={handleGPS}>
              {detect==="detecting"?<RefreshCw size={13} style={{animation:"spin 1s linear infinite"}}/>:
               detect==="done"?<Check size={13}/>:<Compass size={13}/>}
              <span>{detect==="idle"?t.autoDetect:detect==="detecting"?t.detecting:t.detected}</span>
            </div>
            <div className="dsearch" style={{marginBottom:10}}>
              <Search size={13} color="var(--muted)"/>
              <input value={stSrch} placeholder={t.searchState} onChange={function(e){setStSrch(e.target.value);}}
                style={{background:"none",border:"none",outline:"none",flex:1,color:"var(--text)",fontSize:13}}/>
              {stSrch&&<X size={12} color="var(--muted)" style={{cursor:"pointer"}} onClick={function(){setStSrch("");}}/>}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
              {filtStates.map(function(s){
                var sel=selState===s;
                return (
                  <div key={s} className={"state-card"+(sel?" sel":"")}
                    onClick={function(){setSelState(s);setSelDist("");setStep(2);}}>
                    {stateLabel(s)}
                  </div>
                );
              })}
            </div>
            {!filtStates.length && <div style={{padding:16,textAlign:"center",color:"var(--muted)"}}>{"No states available. Clear the search or try again."}</div>}
          </div>
        )}

        {step===2&&(
          <div style={{padding:"0 16px 16px"}}>
            <div className="dsearch" style={{marginBottom:10}}>
              <Search size={13} color="var(--muted)"/>
              <input value={dSrch} placeholder={t.searchDistrict} onChange={function(e){setDSrch(e.target.value);}}
                style={{background:"none",border:"none",outline:"none",flex:1,color:"var(--text)",fontSize:13}}/>
              {dSrch&&<X size={12} color="var(--muted)" style={{cursor:"pointer"}} onClick={function(){setDSrch("");}}/>}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:12}}>
              {filtDists.map(function(d){
                var sel=selDist===d;
                return (
                  <div key={d} className={"dist-card"+(sel?" sel":"")}
                    onClick={function(){setSelDist(d);finish(d);}}>
                    {distLabel(d)}
                  </div>
                );
              })}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button className="contbtn" style={{background:"var(--surface)",color:"var(--muted)",flex:1}}
                onClick={function(){setStep(1);setSelDist("");}}>← {t.back}</button>
              {selDist&&<button className="contbtn" style={{flex:2}} onClick={function(){finish(selDist);}}>{t.confirmDistrict} →</button>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── HOME SCREEN ──────────────────────────────────────────────

function HomeScreen(props) {
  var crop=props.crop,setCrop=props.setCrop,lang=props.lang,district=props.district;
  var markets=props.markets||[],t=props.t,livePrices=props.livePrices||{};
  var weather=props.weather||WEATHER,fetchStatus=props.fetchStatus||{},liveNews=props.liveNews||[];

  var p      = priceData(crop,livePrices);
  var hist   = genHist(p.modal,p.trend,t,livePrices[crop],crop,district&&district.state);
  var dec    = getDecision(crop,t,livePrices,weather);
  var mspst  = getMSP(p.modal,p.msp,t);
  var intel  = getCropIntel(crop);
  var nowMon = new Date().getMonth()+1;
  var isBest = intel&&intel.bestMonth.indexOf(nowMon)>=0;
  var pCtx   = p.priceContext;
  var pConf  = p.predConfidence;
  var confLbl= pConf>=75?"High confidence":pConf>=55?"Medium confidence":"Low confidence";
  var confBg = pConf>=75?"rgba(76,175,80,.2)":pConf>=55?"rgba(255,193,7,.15)":"rgba(255,255,255,.08)";
  var confCol= pConf>=75?"#81C784":pConf>=55?"#FFD54F":"var(--muted)";
  var realD  = (p.history||[]).filter(function(h){return !h.seeded;}).length;
  var dn     = district?getDistrictName(district.name,lang):"";
  var pred   = p.prediction||[];

  var r0=useState("10"),qty=r0[0],setQty=r0[1];
  var r1=useState(false),perKg=r1[0],setPerKg=r1[1];
  var r2=useState(""),vmsg=r2[0],setVmsg=r2[1];
  var r3=useState(false),isListening=r3[0],setListening=r3[1];
  var r4=useState(false),isMuted=r4[0],setMuted=r4[1];

  var dispPrice = perKg?Math.round(p.modal/100):p.modal;
  var dispUnit  = perKg?"/kg":"/qtl";

  var speak = function(txt){
    if (!window.speechSynthesis || isMuted) return;
    window.speechSynthesis.cancel();
    var u=new SpeechSynthesisUtterance(txt);
    u.lang=lang==="hi"?"hi-IN":lang==="te"?"te-IN":lang==="ta"?"ta-IN":"en-IN";
    window.speechSynthesis.speak(u);
  };
  var listen = function(){
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;
    if (!SR){setVmsg(t.voiceHint||"Voice not supported");setTimeout(function(){setVmsg("");},2000);return;}
    var r = new SR();
    if (!r.start){setVmsg(t.voiceHint||"Voice not supported");setTimeout(function(){setVmsg("");},2000);return;}
    r.lang = lang==="hi"?"hi-IN":lang==="te"?"te-IN":lang==="ta"?"ta-IN":"en-IN";
    r.onresult = function(e){
      var tx = (e.results[0] && e.results[0][0] && e.results[0][0].transcript || "").toLowerCase();
      var found = CROPS.find(function(c){return tx.indexOf(getCropName(c,lang).toLowerCase()) >= 0;});
      if (found){setCrop(found);setVmsg("✓ "+getCropName(found,lang));}
      else setVmsg(t.notHeard||"Not recognised");
      setTimeout(function(){setVmsg("");},2000);
    };
    r.onerror = function(e){
      setListening(false);
      var msg = (e && e.error) ? e.error : "Voice error";
      setVmsg(msg);
      setTimeout(function(){setVmsg("");},2000);
    };
    r.onend = function(){setListening(false);};
    try {
      r.start();
      setListening(true);
    } catch (err) {
      setListening(false);
      setVmsg(t.voiceHint||"Voice not supported");
      setTimeout(function(){setVmsg("");},2000);
    }
  };

  return (
    <div className="fade-in">
      <div className="chips">
        {CROPS.map(function(c){
          return <div key={c} className={"chip"+(crop===c?" active":"")} onClick={function(){setCrop(c);}}>{getCropName(c,lang)}</div>;
        })}
      </div>

      <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",padding:"0 13px 4px",gap:6}}>
        {vmsg&&<span style={{fontSize:11,color:"var(--green)"}}>{vmsg}</span>}
        <button onClick={listen} style={{background:"none",border:"1px solid var(--border)",borderRadius:20,padding:"4px 10px",cursor:"pointer",color:"var(--muted)",fontSize:11,display:"flex",alignItems:"center",gap:4}}>
          <Mic size={12}/> {isListening&&<span style={{fontSize:10,color:"var(--green)"}}>{t.listening||"…"}</span>}
        </button>
        <button onClick={function(){setMuted(!isMuted);}} style={{background:"none",border:"1px solid var(--border)",borderRadius:20,padding:"4px 10px",cursor:"pointer",color:"var(--muted)",fontSize:11,display:"flex",alignItems:"center",gap:2}}>
          {isMuted?<VolumeX size={12}/>:<Volume2 size={12}/>}
        </button>
      </div>

      <div className={"dbanner "+dec.cls}>
        <div className="dcrop">{getCropName(crop,lang)} — {dn}</div>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:9}}>
          <div style={{flex:1}}>
            <div className="dlabel">{dec.label}</div>
            <div className="dreason">{dec.reason}</div>
            <div style={{marginTop:6,background:"rgba(0,0,0,.2)",borderRadius:4,height:4,overflow:"hidden"}}>
              <div style={{height:"100%",borderRadius:4,width:dec.score+"%",transition:"width .6s",background:dec.score>=65?"#ef5350":dec.score>=45?"#64b5f6":"#66bb6a"}}/>
            </div>
          </div>
          <button onClick={function(){speak(getCropName(crop,lang)+". "+dec.label+". "+dec.reason);}}
            style={{background:"rgba(255,255,255,.1)",border:"none",borderRadius:"50%",width:36,height:36,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:16}}>
            Vol
          </button>
        </div>
        <div style={{display:"flex",alignItems:"baseline",gap:6,marginTop:8,flexWrap:"wrap"}}>
          <div className="dprice">
            Rs.{fmtP(dispPrice)}
            <span onClick={function(){setPerKg(function(v){return !v;});}} style={{fontSize:12,color:"var(--muted)",cursor:"pointer",marginLeft:3,borderBottom:"1px dashed rgba(255,255,255,.3)"}}>
              {dispUnit} ↕
            </span>
          </div>
          {livePrices[crop]&&<span style={{fontSize:9,padding:"2px 6px",borderRadius:8,background:"rgba(76,175,80,.2)",color:"#81C784",fontWeight:700}}>LIVE</span>}
        </div>
        {mspst&&(
          <div className={"mspill "+mspst.cls} style={{marginTop:6,display:"inline-flex",alignItems:"center",gap:4,fontSize:10,padding:"3px 8px"}}>
            {mspst.cls==="above"?<CheckCircle size={10}/>:<AlertTriangle size={10}/>} {mspst.label}
          </div>
        )}
      </div>

      <div className="card">
        <div style={{fontSize:10,fontWeight:700,color:"var(--muted)",letterSpacing:1,marginBottom:8}}>{t.revenue||"EXPECTED REVENUE"}</div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <input className="finput" type="number" value={qty} onChange={function(e){setQty(e.target.value);}} style={{width:70,textAlign:"center",fontSize:15,fontWeight:600}}/>
          <span style={{fontSize:12,color:"var(--muted)"}}>{perKg?"kg":"qtl"} × Rs.{fmtP(dispPrice)} =</span>
          <span style={{fontFamily:"DM Mono,monospace",fontSize:18,color:"var(--gold)",fontWeight:700}}>Rs.{fmtP((parseInt(qty)||0)*dispPrice)}</span>
        </div>
      </div>

      <div className="card">
        <div className="card-title" style={{marginBottom:8}}>{t.todayPrice||"Today's Price Range"}</div>
        <div className="pgrid">
          <div style={{textAlign:"center"}}><div style={{fontSize:10,color:"var(--muted)",marginBottom:3}}>MIN</div><div style={{fontFamily:"DM Mono,monospace",fontSize:16,color:"var(--red)",fontWeight:700}}>Rs.{fmtP(p.min)}</div></div>
          <div style={{textAlign:"center"}}><div style={{fontSize:10,color:"var(--muted)",marginBottom:3}}>MODAL</div><div style={{fontFamily:"DM Mono,monospace",fontSize:20,color:"var(--gold)",fontWeight:700}}>Rs.{fmtP(p.modal)}</div></div>
          <div style={{textAlign:"center"}}><div style={{fontSize:10,color:"var(--muted)",marginBottom:3}}>MAX</div><div style={{fontFamily:"DM Mono,monospace",fontSize:16,color:"var(--green)",fontWeight:700}}>Rs.{fmtP(p.max)}</div></div>
        </div>
        {pCtx&&pCtx.weekAgo&&(
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:6,justifyContent:"center"}}>
            <div style={{fontSize:10,padding:"2px 8px",borderRadius:10,
              background:pCtx.weekChange>0?"rgba(76,175,80,.12)":pCtx.weekChange<0?"rgba(229,57,53,.12)":"rgba(255,255,255,.06)",
              color:pCtx.weekChange>0?"#81C784":pCtx.weekChange<0?"#EF9A9A":"var(--muted)"}}>
              {pCtx.weekChange>0?"▲":"▼"} {Math.abs(pCtx.weekChange)}% vs last week (₹{pCtx.weekAgo})
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <div className="card-title" style={{marginBottom:0}}>{t.sevenDay}</div>
          {pConf>0&&<div style={{fontSize:10,padding:"2px 7px",borderRadius:8,background:confBg,color:confCol}}>{realD>0?realD+"d · ":""}{confLbl}</div>}
        </div>
        <div className="gwrap">
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={hist} margin={{top:4,right:8,bottom:0,left:8}}>
              <XAxis dataKey="day" tick={{fontSize:9,fill:"var(--muted)"}} axisLine={false} tickLine={false}/>
              <YAxis hide domain={["auto","auto"]}/>
              <Tooltip contentStyle={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:8,fontSize:11}}
                formatter={function(v,n,pp){
                  if (n === "price") return ["Rs."+fmtP(v)+(pp.payload&&pp.payload.predicted?" (forecast)":""), "Price"];
                  if (n === "ema7") return ["Rs."+fmtP(v), "EMA 7-day"];
                  if (n === "ema14") return ["Rs."+fmtP(v), "EMA 14-day"];
                  if (n === "upper") return ["Rs."+fmtP(v), "Upper Band"];
                  if (n === "lower") return ["Rs."+fmtP(v), "Lower Band"];
                  return [v, n];
                }}
                labelStyle={{color:"var(--muted)"}}/>
              <ReferenceLine y={p.modal} stroke="var(--gold)" strokeDasharray="3 3" strokeOpacity={0.4}/>
              <Line type="monotone" dataKey="upper" stroke="rgba(76,175,80,0.3)" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="lower" stroke="rgba(76,175,80,0.3)" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="ema14" stroke="#FF9800" strokeWidth={1} strokeDasharray="5 5" dot={false} />
              <Line type="monotone" dataKey="ema7" stroke="#2196F3" strokeWidth={1} strokeDasharray="3 3" dot={false} />
              <Line type="monotone" dataKey="price" stroke="var(--green)" strokeWidth={2}
                dot={function(dp){if(dp.payload&&dp.payload.predicted)return <circle key={dp.key} cx={dp.cx} cy={dp.cy} r={3} fill="#FFD54F" stroke="none"/>;return <circle key={dp.key} cx={dp.cx} cy={dp.cy} r={0} fill="none"/>;}}
                activeDot={{r:4,fill:"var(--gold)"}}/>
            </LineChart>
          </ResponsiveContainer>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:4,justifyContent:"center",fontSize:9,color:"var(--muted)"}}>
            <span style={{display:"flex",alignItems:"center",gap:2}}><div style={{width:8,height:1,background:"var(--green)"}}></div> Price</span>
            <span style={{display:"flex",alignItems:"center",gap:2}}><div style={{width:8,height:1,background:"#2196F3",borderStyle:"dashed",borderWidth:"1px 0"}}></div> EMA7</span>
            <span style={{display:"flex",alignItems:"center",gap:2}}><div style={{width:8,height:1,background:"#FF9800",borderStyle:"dashed",borderWidth:"1px 0"}}></div> EMA14</span>
            <span style={{display:"flex",alignItems:"center",gap:2}}><div style={{width:8,height:1,background:"rgba(76,175,80,0.3)"}}></div> Confidence</span>
          </div>
        </div>
      </div>

      {pred.length>0&&(
        <div style={{background:"var(--card)",borderRadius:12,padding:"10px 13px",marginBottom:8,border:"1px solid var(--border)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
            <div style={{fontSize:12,fontWeight:700,color:"var(--cream)"}}>7-Day Price Forecast</div>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              {p.predAccuracy&&(
                <div style={{fontSize:9,padding:"2px 6px",borderRadius:6,
                  background:p.predAccuracy.accuracy>75?"rgba(76,175,80,.12)":p.predAccuracy.accuracy>60?"rgba(255,152,0,.12)":"rgba(229,57,53,.12)",
                  color:p.predAccuracy.accuracy>75?"#81C784":p.predAccuracy.accuracy>60?"#FF9800":"#EF9A9A",
                  cursor:"help",title:`Accuracy: ${p.predAccuracy.accuracy}% | Direction: ${p.predAccuracy.directionalAccuracy}% | Based on ${p.predAccuracy.sampleSize} test points`}}>
                  {p.predAccuracy.accuracy}% Accurate
                </div>
              )}
              <div style={{fontSize:10,padding:"2px 7px",borderRadius:10,background:confBg,color:confCol}}>{confLbl}</div>
            </div>
          </div>
          {p.metrics&&(
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
              {p.predAccuracy&&p.predAccuracy.accuracy>75&&<div style={{fontSize:9,padding:"2px 6px",borderRadius:6,background:"rgba(76,175,80,.12)",color:"#81C784"}}>High Accuracy</div>}
              {p.predAccuracy&&p.predAccuracy.directionalAccuracy>70&&<div style={{fontSize:9,padding:"2px 6px",borderRadius:6,background:"rgba(33,150,243,.12)",color:"#2196F3"}}>Good Direction</div>}
              {p.metrics.momentumRatio>5&&<div style={{fontSize:9,padding:"2px 6px",borderRadius:6,background:"rgba(76,175,80,.12)",color:"#81C784"}}>Bullish Momentum</div>}
              {p.metrics.ema7>p.metrics.ema14&&<div style={{fontSize:9,padding:"2px 6px",borderRadius:6,background:"rgba(33,150,243,.12)",color:"#2196F3"}}>EMA Crossover</div>}
              {p.metrics.rSquared>0.7&&<div style={{fontSize:9,padding:"2px 6px",borderRadius:6,background:"rgba(255,152,0,.12)",color:"#FF9800"}}>Strong Trend</div>}
              {p.metrics.stdDev/p.modal<0.1&&<div style={{fontSize:9,padding:"2px 6px",borderRadius:6,background:"rgba(156,39,176,.12)",color:"#9C27B0"}}>Low Volatility</div>}
            </div>
          )}
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
            {pred.map(function(pt,i){
              var prev=i>0?pred[i-1].price:p.modal;
              var up=pt.price>=prev;
              return (
                <div key={i} style={{textAlign:"center",padding:"6px 2px",borderRadius:8,background:"rgba(255,255,255,.04)",border:"1px solid var(--border)"}}>
                  <div style={{fontSize:9,color:"var(--muted)",marginBottom:2}}>{new Date(pt.date).toLocaleDateString("en-IN",{weekday:"short"})}</div>
                  <div style={{fontFamily:"DM Mono,monospace",fontSize:11,fontWeight:700,color:up?"#81C784":"#EF9A9A"}}>{pt.price>=1000?(pt.price/100).toFixed(1)+"k":pt.price}</div>
                  <div style={{fontSize:10}}>{up?"▲":"▼"}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {intel&&(
        <div className="card" style={{padding:"12px 14px",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",gap:8}}>
            <div style={{flex:1}}>
              <div style={{fontSize:10,fontWeight:700,color:"var(--muted)",letterSpacing:1,marginBottom:4}}>STORAGE GUIDE</div>
              <div style={{fontSize:12,color:"var(--text)",lineHeight:1.5}}>{intel.store}</div>
            </div>
            <div style={{fontSize:22,flexShrink:0}}>{intel.icon}</div>
          </div>
          <div style={{marginTop:8,padding:"8px 10px",borderRadius:8,
            background:isBest?"rgba(76,175,80,.12)":"rgba(255,255,255,.04)",
            border:isBest?"1px solid rgba(76,175,80,.3)":"1px solid var(--border)"}}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:1,marginBottom:3,color:isBest?"var(--green)":"var(--muted)"}}>{isBest?"GOOD SELLING MONTH":"SELL WINDOW TIP"}</div>
            <div style={{fontSize:12,color:"var(--text)",lineHeight:1.5}}>{intel.sellTip}</div>
          </div>
        </div>
      )}

      {weather.harvestRisk&&(
        <div className="ralert">
          <AlertTriangle size={15} color="var(--amber)" style={{flexShrink:0,marginTop:1}}/>
          <div><h4>{t.harvestRisk}</h4><p>{t.harvestRiskSub}</p></div>
        </div>
      )}

      <div className="shdr"><div className="stitle">{t.nearbyMarkets}</div><div className="sact">{t.seeAll}</div></div>
      {fetchStatus.markets==="loading"&&<div className="card" style={{textAlign:"center",padding:"18px 0",color:"var(--muted)",fontSize:12}}>{t.detecting||"Finding mandis…"}</div>}
      {markets.slice(0,3).map(function(m,i){
        return (
          <div key={i} className="card" style={{padding:"11px 14px",marginBottom:6}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                  <MapPin size={11} color="var(--green)"/>
                  <span style={{fontSize:13,fontWeight:600,color:"var(--cream)"}}>{m.name}</span>
                  {m.rating==="BEST"&&<span style={{fontSize:9,padding:"1px 6px",borderRadius:10,background:"var(--green)",color:"#000",fontWeight:700}}>BEST</span>}
                </div>
                <div className="mdist">{m.km<=2?"Nearby":"~"+Math.round(m.km)+" km"}{m.type?" · "+m.type:""}</div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontFamily:"DM Mono,monospace",fontSize:15,fontWeight:700,color:"var(--gold)"}}>Rs.{fmtP(Math.max(0,p.modal+(m.priceOffset||0)))}</div>
                {m.lat&&<a href={"https://www.google.com/maps?q="+m.lat+","+m.lon} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:"var(--blue)",textDecoration:"none"}}>Map</a>}
              </div>
            </div>
          </div>
        );
      })}

      {liveNews.length>0&&(
        <div>
          <div className="shdr"><div className="stitle">AGRI NEWS</div></div>
          {liveNews.slice(0,4).map(function(item,i){
            return (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
                style={{display:"block",textDecoration:"none",padding:"10px 13px",borderBottom:"1px solid var(--border)"}}>
                <div style={{fontWeight:600,fontSize:13,color:"var(--text)",lineHeight:1.4,marginBottom:3}}>{item.title}</div>
                {item.description&&<div style={{fontSize:11,color:"var(--muted)",lineHeight:1.4}}>{item.description}</div>}
                <div style={{fontSize:10,color:"var(--green)",marginTop:3}}>{item.date?new Date(item.date).toLocaleDateString("en-IN",{day:"numeric",month:"short"}):""}{item.source?" · "+item.source:""}</div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── MARKETS SCREEN ───────────────────────────────────────────

function MarketsScreen(props) {
  var crop=props.crop,setCrop=props.setCrop,lang=props.lang,district=props.district;
  var markets=props.markets||[],t=props.t,livePrices=props.livePrices||{},fetchStatus=props.fetchStatus||{};
  var p=priceData(crop,livePrices);
  var myState=district&&district.state;
  var CSTATES=["Telangana","Andhra Pradesh","Tamil Nadu","Karnataka","Maharashtra","Madhya Pradesh","Uttar Pradesh","Gujarat","Rajasthan","Punjab"];
  var comps=CSTATES.map(function(st){
    var hist=loadHistory(st,crop);
    var real=(hist||[]).filter(function(h){return !h.seeded;}).sort(function(a,b){return b.date.localeCompare(a.date);});
    if (!real[0]) return null;
    var days=Math.round((Date.now()-new Date(real[0].date).getTime())/86400000);
    if (days>7) return null;
    return {state:st,price:real[0].price,market:real[0].market||""};
  }).filter(Boolean).sort(function(a,b){return b.price-a.price;});
  var myPriceObj=comps.filter(function(c){return c.state===myState;})[0];
  var myP=myPriceObj&&myPriceObj.price;
  var bestSt=comps[0];

  return (
    <div className="fade-in">
      <div className="chips">
        {CROPS.map(function(c){return <div key={c} className={"chip"+(crop===c?" active":"")} onClick={function(){setCrop(c);}}>{getCropName(c,lang)}</div>;})}
      </div>
      <div className="shdr">
        <div className="stitle">{t.nearbyMarkets}</div>
        <div style={{fontSize:11,color:"var(--muted)"}}>{fetchStatus.markets==="done"?markets.length+" mandis · OSM":fetchStatus.markets==="loading"?"Locating…":""}</div>
      </div>
      {fetchStatus.markets==="loading"&&<div className="card" style={{textAlign:"center",padding:20,color:"var(--muted)",fontSize:12}}>Finding mandis near {(district&&district.name)||"you"}…</div>}
      {markets.map(function(m,i){
        return (
          <div key={i} className="card" style={{padding:"12px 14px",marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:3}}>
                  <MapPin size={12} color="var(--green)"/>
                  <span style={{fontSize:13,fontWeight:600,color:"var(--cream)"}}>{m.name}</span>
                  {m.rating==="BEST"&&<span style={{fontSize:9,padding:"1px 6px",borderRadius:10,background:"var(--green)",color:"#000",fontWeight:700}}>BEST</span>}
                </div>
                <div style={{fontSize:11,color:"var(--muted)",marginBottom:m.address?4:0}}>📍 {m.km<=2?"Nearby":"~"+Math.round(m.km)+" km away"}{m.type&&<span style={{marginLeft:6,fontSize:10,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,padding:"1px 5px"}}>{m.type}</span>}</div>
                {m.address&&<div style={{fontSize:10,color:"var(--muted)"}}>{m.address}</div>}
                <div style={{display:"flex",gap:8,marginTop:6}}>
                  {m.lat&&<a href={"https://www.google.com/maps?q="+m.lat+","+m.lon+"&zoom=16"} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:"var(--blue)",textDecoration:"none"}}>Map</a>}
                  {m.lat&&<a href={"https://www.google.com/maps/dir/?api=1&destination="+m.lat+","+m.lon} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:"var(--green)",textDecoration:"none"}}>Route</a>}
                  {m.phone&&<a href={"tel:"+m.phone} style={{fontSize:11,color:"var(--muted)",textDecoration:"none"}}>Call</a>}
                </div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontFamily:"DM Mono,monospace",fontSize:16,fontWeight:700,color:"var(--gold)"}}>Rs.{fmtP(Math.max(0,p.modal+(m.priceOffset||0)))}</div>
                <div style={{fontSize:9,color:"var(--muted)"}}>/qtl</div>
              </div>
            </div>
          </div>
        );
      })}
      {comps.length>=2&&(
        <div style={{marginTop:8}}>
          <div className="shdr"><div className="stitle">{"STATE COMPARISON — "+crop.toUpperCase()}</div></div>
          <div className="card" style={{padding:0,overflow:"hidden"}}>
            {comps.map(function(c,i){
              return (
                <div key={c.state} style={{display:"flex",alignItems:"center",padding:"10px 14px",borderBottom:i<comps.length-1?"1px solid var(--border)":"none",background:c.state===myState?"rgba(255,193,7,.06)":"transparent"}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:c.state===myState?700:500,color:"var(--text)"}}>{c.state===myState?" ":""}{c.state}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:14,fontWeight:700,color:bestSt&&c.state===bestSt.state?"var(--green)":"var(--text)"}}>₹{c.price.toLocaleString("en-IN")}</div>
                    {myP&&c.state!==myState&&<div style={{fontSize:10,color:c.price>myP?"#81C784":"#EF9A9A"}}>{c.price>myP?"+₹"+(c.price-myP).toLocaleString("en-IN"):"-₹"+(myP-c.price).toLocaleString("en-IN")} vs you</div>}
                  </div>
                  {bestSt&&c.state===bestSt.state&&<div style={{marginLeft:8,fontSize:9,padding:"2px 6px",borderRadius:6,background:"rgba(76,175,80,.2)",color:"var(--green)",fontWeight:700}}>BEST</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── TRIP SCREEN ──────────────────────────────────────────────

function TripScreen(props) {
  var crop=props.crop,markets=props.markets||[],lang=props.lang,t=props.t,livePrices=props.livePrices||{};
  var p=priceData(crop,livePrices);
  var r0=useState("10"),qty=r0[0],setQty=r0[1];
  var r1=useState("bike"),veh=r1[0],setVeh=r1[1];
  var r2=useState("103"),petrol=r2[0],setPetrol=r2[1];
  var r3=useState("1"),laborD=r3[0],setLaborD=r3[1];
  var r4=useState("500"),wage=r4[0],setWage=r4[1];
  var Q=parseFloat(qty)||0,PR=parseFloat(petrol)||103,LD=parseInt(laborD)||0,WG=parseFloat(wage)||0;
  var vlist=[{key:"bike",label:t.bike,em:"2W"},{key:"autoV",label:t.autoV,em:"Auto"},{key:"car",label:t.car,em:"Car"},{key:"truck",label:t.truck,em:"Tractor"}];
  var results=markets.map(function(m){
    var mp=p.modal+(m.priceOffset||0);
    return Object.assign({market:m,mp:mp},calcTrip(m.km,mp,p.modal,Q,veh,PR,LD,WG));
  }).sort(function(a,b){return b.net-a.net;});
  var fields=[[t.quantity,qty,setQty,"10"],[t.petrolPrice,petrol,setPetrol,"103"],[t.laborDays,laborD,setLaborD,"1"],[t.dailyWage,wage,setWage,"500"]];

  return (
    <div className="fade-in">
      <div style={{padding:"12px 13px 3px"}}>
        <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:20,letterSpacing:"1.5px",color:"var(--cream)",marginBottom:2}}>{t.tripCalc}</div>
        <div style={{fontSize:11,color:"var(--muted)"}}>{getCropName(crop,lang)} — {Q} {t.qtlUnit}</div>
      </div>
      <div className="card">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
          {fields.map(function(f){
            return <div key={f[0]}><div className="flabel">{f[0]}</div><input className="finput" type="number" value={f[1]} placeholder={f[3]} onChange={function(e){f[2](e.target.value);}}/></div>;
          })}
        </div>
        <div style={{marginTop:9}}>
          <div className="flabel" style={{marginBottom:6}}>{t.vehicle}</div>
          <div style={{display:"flex",gap:5}}>
            {vlist.map(function(v){
              return (
                <div key={v.key} onClick={function(){setVeh(v.key);}}
                  style={{flex:1,padding:"7px 3px",borderRadius:8,textAlign:"center",cursor:"pointer",
                    border:veh===v.key?"1.5px solid var(--gold)":"1.5px solid var(--border)",
                    background:veh===v.key?"#2A2A1A":"var(--surface)",
                    color:veh===v.key?"var(--gold)":"var(--muted)",fontSize:10,transition:"all .2s"}}>
                  <div style={{fontSize:18,marginBottom:2}}>{v.em}</div>{v.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {results.map(function(r,i){
        return (
          <div key={i} className={"tcard"+(r.net<0?" nogo":"")}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:"var(--cream)",marginBottom:2}}>{r.market.name}</div>
                <div style={{fontSize:11,color:"var(--muted)"}}>{r.market.km<=2?"Nearby":"~"+Math.round(r.market.km)+" km"} · Rs.{fmtP(r.mp)}/qtl</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:"DM Mono,monospace",fontSize:17,fontWeight:700,color:r.net>=0?"var(--green)":"var(--red)"}}>Rs.{fmtP(Math.abs(r.net))}</div>
                <div className="tverd" style={{color:r.net>=0?"var(--green)":"var(--red)"}}>{r.net>=0?t.goGo||"WORTH IT":t.noGo||"NOT WORTH"}</div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,marginTop:8}}>
              {[[t.revenue,"Rs."+fmtP(r.revenue),"var(--gold)"],[t.totalCost||"Cost","Rs."+fmtP(r.cost),"var(--red)"],[t.netProfit||"Net","Rs."+fmtP(r.net),r.net>=0?"var(--green)":"var(--red)"]].map(function(row){
                return <div key={row[0]} style={{background:"rgba(255,255,255,.04)",borderRadius:7,padding:"6px 8px",textAlign:"center"}}><div style={{fontSize:9,color:"var(--muted)",marginBottom:2}}>{row[0]}</div><div style={{fontFamily:"DM Mono,monospace",fontSize:12,fontWeight:700,color:row[2]}}>{row[1]}</div></div>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── WATCH SCREEN ─────────────────────────────────────────────

function WatchScreen(props) {
  var watchlist=props.watchlist,setWatchlist=props.setWatchlist;
  var alerts=props.alerts,setAlerts=props.setAlerts;
  var lang=props.lang,t=props.t,livePrices=props.livePrices||{};
  var r0=useState("watchlist"),tab=r0[0],setTab=r0[1];
  var r1=useState(false),addMode=r1[0],setAddMode=r1[1];
  var r2=useState("Tomato"),nc=r2[0],setNc=r2[1];
  var r3=useState("above"),nt=r3[0],setNt=r3[1];
  var r4=useState(""),np=r4[0],setNp=r4[1];
  var addAlert=function(){if(!np)return;setAlerts(alerts.concat([{id:Date.now(),crop:nc,type:nt,price:parseInt(np),active:true}]));setNp("");setAddMode(false);};

  return (
    <div className="fade-in">
      <div className="tbar">
        {["watchlist","alerts"].map(function(tb){return <div key={tb} className={"ttab"+(tab===tb?" active":"")} onClick={function(){setTab(tb);}}>{tb==="watchlist"?t.watchlist||"Watchlist":t.alerts||"Alerts"}</div>;})}
      </div>
      {tab==="watchlist"&&(
        <div>
          <div style={{padding:"0 13px 8px"}}>
            <div className="flabel">{t.addCrop||"Add crop"}</div>
            <select className="finput" value="" onChange={function(e){if(e.target.value&&watchlist.indexOf(e.target.value)<0)setWatchlist(watchlist.concat([e.target.value]));}}>
              <option value="">— select —</option>
              {CROPS.filter(function(c){return watchlist.indexOf(c)<0;}).map(function(c){return <option key={c} value={c}>{getCropName(c,lang)}</option>;})}
            </select>
          </div>
          {watchlist.length===0&&<div className="empty"><Star size={24} style={{display:"block",margin:"0 auto"}}/><p>{t.noWatchlist}</p></div>}
          {watchlist.map(function(c){
            var pp=priceData(c,livePrices),mst=getMSP(pp.modal,pp.msp,t);
            return (
              <div key={c} style={{margin:"0 13px 8px"}}>
                <div className="card" style={{padding:"11px 13px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <div style={{fontSize:13,fontWeight:600,color:"var(--cream)",marginBottom:2}}>{getCropName(c,lang)}</div>
                      <div style={{display:"flex",gap:6,alignItems:"center"}}>
                        <span style={{fontSize:10,color:"var(--muted)"}}>{pp.market}</span>
                        {mst&&<div className={"mspill "+mst.cls} style={{fontSize:9,padding:"1px 5px"}}>{mst.label}</div>}
                      </div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontFamily:"DM Mono,monospace",fontSize:17,fontWeight:700,color:"var(--gold)"}}>Rs.{fmtP(pp.modal)}</div>
                      <div style={{fontSize:10,color:pp.trend==="up"?"var(--green)":pp.trend==="down"?"var(--red)":"var(--muted)"}}>{pp.trend==="up"?"↑ "+t.trendRising:pp.trend==="down"?"↓ "+t.trendFalling:"→ "+t.trendStable}</div>
                    </div>
                    <X size={14} color="var(--muted)" style={{cursor:"pointer",marginLeft:8}} onClick={function(){setWatchlist(watchlist.filter(function(w){return w!==c;}));}}/>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {tab==="alerts"&&(
        <div>
          {!addMode&&<div style={{padding:"0 13px 10px"}}><button onClick={function(){setAddMode(true);}} style={{width:"100%",padding:"10px 0",borderRadius:10,border:"1.5px dashed var(--border)",background:"none",color:"var(--muted)",cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><Plus size={14}/> {t.addAlert||"Add alert"}</button></div>}
          {addMode&&(
            <div className="card">
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                <div><div className="flabel">{t.cropLabel}</div><select className="finput" value={nc} onChange={function(e){setNc(e.target.value);}}>{CROPS.map(function(c){return <option key={c} value={c}>{getCropName(c,lang)}</option>;})}</select></div>
                <div><div className="flabel">{t.typeLabel||"Condition"}</div><select className="finput" value={nt} onChange={function(e){setNt(e.target.value);}}><option value="above">{t.notifyAbove||"Above"}</option><option value="below">{t.notifyBelow||"Below"}</option></select></div>
              </div>
              <div className="flabel">{t.priceLabel||"Price (Rs/qtl)"}</div>
              <input className="finput" type="number" value={np} onChange={function(e){setNp(e.target.value);}} placeholder="e.g. 2000" style={{marginBottom:8}}/>
              <div style={{display:"flex",gap:6}}>
                <button onClick={function(){setAddMode(false);}} style={{flex:1,padding:"8px 0",borderRadius:8,border:"1px solid var(--border)",background:"none",color:"var(--muted)",cursor:"pointer"}}>{t.cancelBtn||"Cancel"}</button>
                <button onClick={addAlert} style={{flex:2,padding:"8px 0",borderRadius:8,border:"none",background:"var(--gold)",color:"#000",fontWeight:700,cursor:"pointer"}}>{t.setAlert||"Set Alert"}</button>
              </div>
            </div>
          )}
          {alerts.length===0&&<div className="empty"><Bell size={24} style={{display:"block",margin:"0 auto"}}/><p>{t.noAlerts}</p></div>}
          {alerts.map(function(a){
            var pp=priceData(a.crop,livePrices),triggered=a.type==="above"?pp.modal>=a.price:pp.modal<=a.price;
            return (
              <div key={a.id} style={{margin:"0 13px 8px"}}>
                <div className="card" style={{padding:"11px 13px",background:triggered?"rgba(76,175,80,.08)":"var(--card)",border:triggered?"1px solid rgba(76,175,80,.3)":"1px solid var(--border)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <div style={{fontSize:13,fontWeight:600,marginBottom:2,color:triggered?"var(--green)":"var(--cream)"}}>{triggered?" ":""}{getCropName(a.crop,lang)} {a.type==="above"?"above":"below"} Rs.{fmtP(a.price)}</div>
                      <div style={{fontSize:11,color:"var(--muted)"}}>Now: Rs.{fmtP(pp.modal)} — {triggered?"Triggered":"Waiting"}</div>
                    </div>
                    <X size={14} color="var(--muted)" style={{cursor:"pointer"}} onClick={function(){setAlerts(alerts.filter(function(x){return x.id!==a.id;}));}}/>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── TOOLS SCREEN ─────────────────────────────────────────────

function ToolsScreen(props) {
  var crop=props.crop,lang=props.lang,t=props.t,livePrices=props.livePrices||{};
  var weather=props.weather||WEATHER,liveWeather=props.liveWeather,liveNews=props.liveNews||{};
  var r0=useState("weather"),tab=r0[0],setTab=r0[1];
  var r1=useState(crop||"Rice"),mcrop=r1[0],setMcrop=r1[1];
  var r2=useState("all"),scrop=r2[0],setScrop=r2[1];
  var r3=useState(crop||"Rice"),stcrop=r3[0],setStcrop=r3[1];
  var r4=useState(crop||"Rice"),calcrop=r4[0],setCalcrop=r4[1];
  var r5=useState(""),cv=r5[0],setCv=r5[1];
  var r6=useState(null),cr=r6[0],setCr=r6[1];
  var mp=priceData(mcrop,livePrices),mst=getMSP(mp.modal,mp.msp,t);
  var sr=STORAGE[stcrop]||STORAGE["Rice"],cal=CROP_CALENDAR[calcrop]||CROP_CALENDAR["Rice"];
  var filtSch=scrop==="all"?SCHEMES:SCHEMES.filter(function(s){return s.crops.indexOf(scrop)>=0||s.crops.length===0;});
  var advisory=(function(){
    var days=(weather&&weather.days)||[],rain=days.filter(function(d){return d.rain>40;}),hot=days.filter(function(d){return (d.tempMax||d.temp)>38;});
    var maxR=Math.max.apply(null,days.map(function(d){return d.rain||0;}));
    var avgT=Math.round(days.slice(0,4).reduce(function(s,d){return s+(d.tempMax||d.temp||30);},0)/Math.max(1,Math.min(days.length,4)));
    if (rain.length>0) return "Heavy rain expected (up to "+maxR+"% chance). Harvest and cover storage. Perishables — sell immediately. Grains — seal bags.";
    if (hot.length>0)  return "Hot dry weather ("+avgT+"°C). Good for grain drying. Perishables deteriorate faster.";
    return "Mild conditions ("+avgT+"°C, low rain). Good transport window. Keep grain moisture below 14%.";
  })();
  var conv=function(unit){var v=parseFloat(cv);if(!v)return;var f={guntha:0.025,acre:1,bigha:0.619,cent:0.01};var ac=v*(f[unit]||1);setCr({acres:ac.toFixed(3),ha:(ac*0.4047).toFixed(3),labelKey:"unit"+unit.charAt(0).toUpperCase()+unit.slice(1)});};
  var tabs=[{id:"weather",label:"Weather"},{id:"msp",label:"MSP"},{id:"schemes",label:"Schemes"},{id:"storage",label:"Storage"},{id:"calendar",label:"Calendar"},{id:"convert",label:"Convert"}];

  return (
    <div className="fade-in">
      <div className="tbar" style={{overflowX:"auto"}}>
        {tabs.map(function(tb){return <div key={tb.id} className={"ttab"+(tab===tb.id?" active":"")} onClick={function(){setTab(tb.id);}} style={{flexShrink:0}}>{tb.label}</div>;})}
      </div>

      {tab==="weather"&&(
        <div>
          <div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 13px 4px"}}>
            <span style={{fontSize:10,color:"var(--muted)"}}>{liveWeather?"Open-Meteo · Live":"Sample data"}</span>
            {liveWeather&&<div style={{fontSize:10,padding:"2px 7px",borderRadius:10,background:"rgba(76,175,80,.15)",color:"#81C784"}}>LIVE</div>}
          </div>
          <div className="wstrip">
            {weather.days.map(function(d,i){
              return (
                <div key={i} className={"wday"+(d.rain>60?" warn":"")}>
                  <div className="wdlabel">{i===0?t.today:i===1?t.tomorrow:t.dayPrefix+" "+(i+1)}</div>
                  <div style={{marginBottom:3}}><WIcon type={d.icon}/></div>
                  <div className="wtemp">{d.tempMax||d.temp}{t.degreeC}</div>
                  {d.tempMin!==undefined&&<div style={{fontSize:9,color:"var(--muted)"}}>{d.tempMin}{t.degreeC}</div>}
                  <div className="wrain"><Droplets size={9}/> {d.rain}%</div>
                  {d.wind!==undefined&&<div style={{fontSize:9,color:"var(--muted)"}}>{d.wind}km/h</div>}
                  {d.uv!==undefined&&d.uv>0&&<div style={{fontSize:9,color:d.uv>7?"#E57373":d.uv>4?"#FFD54F":"var(--muted)"}}>UV {d.uv}</div>}
                </div>
              );
            })}
          </div>
          <div className="card"><div className="card-title">{t.storageAdvisory}</div><div style={{fontSize:12,color:"var(--muted)",lineHeight:1.6}}>{advisory}</div></div>
          {liveNews.length>0&&(
            <div className="card">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <div className="card-title" style={{marginBottom:0}}>Agri News</div>
                <div style={{fontSize:10,padding:"2px 7px",borderRadius:10,background:"rgba(76,175,80,.15)",color:"#81C784"}}>LIVE</div>
              </div>
              {liveNews.map(function(item,i){
                return (
                  <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
                    style={{display:"block",padding:"9px 0",borderBottom:i<liveNews.length-1?"1px solid var(--border)":"none",textDecoration:"none"}}>
                    <div style={{fontSize:12,fontWeight:600,color:"var(--cream)",lineHeight:1.4,marginBottom:3}}>{item.title}</div>
                    {item.description&&<div style={{fontSize:11,color:"var(--muted)",lineHeight:1.4}}>{item.description}</div>}
                    <div style={{fontSize:10,color:"var(--blue)",marginTop:4}}>{item.date?new Date(item.date).toLocaleDateString("en-IN",{day:"numeric",month:"short"}):""}{item.source?" · "+item.source:""}</div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      )}

      {tab==="msp"&&(
        <div>
          <div style={{padding:"0 13px 9px"}}><div className="flabel">{t.cropLabel}</div><select className="finput" value={mcrop} onChange={function(e){setMcrop(e.target.value);}}>{CROPS.filter(function(c){return priceData(c,livePrices).msp>0;}).map(function(c){return <option key={c} value={c}>{getCropName(c,lang)}</option>;})}</select></div>
          <div className="card">
            <div className="card-title">{t.mspVsMarket} · {getCropName(mcrop,lang)}</div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div><div style={{fontSize:10,color:"var(--muted)",marginBottom:2}}>{t.msp||"MSP"}</div><div style={{fontFamily:"DM Mono,monospace",fontSize:19,color:"var(--blue)"}}>{fmtP(mp.msp)}</div></div>
              <div style={{fontSize:15,color:"var(--muted)"}}>{t.vsLabel}</div>
              <div style={{textAlign:"right"}}><div style={{fontSize:10,color:"var(--muted)",marginBottom:2}}>{t.marketLabel}</div><div style={{fontFamily:"DM Mono,monospace",fontSize:19,color:"var(--gold)"}}>{fmtP(mp.modal)}</div></div>
            </div>
            {mst&&<div style={{textAlign:"center"}}><div className={"mspill "+mst.cls} style={{fontSize:11,padding:"7px 14px",display:"inline-flex",alignItems:"center",gap:4}}>{mst.cls==="above"?<CheckCircle size={11}/>:<AlertTriangle size={11}/>} {mst.label} · {mp.modal>mp.msp?"+":""}{fmtP(mp.modal-mp.msp)}</div></div>}
          </div>
          <div className="card">
            <div className="card-title">{t.allCrops} with MSP</div>
            {CROPS.filter(function(c){return priceData(c,livePrices).msp>0;}).map(function(c){
              var cp=priceData(c,livePrices),st=getMSP(cp.modal,cp.msp,t);
              return <div key={c} className="wrow"><div style={{display:"flex",alignItems:"center",gap:6}}><Leaf size={12} color="var(--muted)"/><span style={{fontSize:12,fontWeight:500}}>{getCropName(c,lang)}</span></div><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontFamily:"DM Mono,monospace",fontSize:11}}>{fmtP(cp.modal)}</span>{st&&<div className={"mspill "+st.cls} style={{fontSize:9,padding:"2px 6px"}}>{st.label}</div>}</div></div>;
            })}
          </div>
        </div>
      )}

      {tab==="schemes"&&(
        <div>
          <div style={{padding:"0 13px 8px"}}><div className="flabel">{t.filterCrop}</div><select className="finput" value={scrop} onChange={function(e){setScrop(e.target.value);}}><option value="all">{t.allCrops}</option>{CROPS.map(function(c){return <option key={c} value={c}>{getCropName(c,lang)}</option>;})}</select></div>
          <div style={{padding:"0 13px"}}>
            {filtSch.map(function(s,i){
              return (
                <div key={i} className="sccard">
                  <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:6}}><div className="scname">{s.name}</div><ChevronRight size={13} color="var(--muted)" style={{flexShrink:0,marginTop:2}}/></div>
                  <div className="scdesc">{s.desc[lang]||s.desc.en}</div>
                  {s.crops.length>0&&<div style={{marginTop:6,display:"flex",flexWrap:"wrap",gap:4}}>{s.crops.map(function(c){return <span key={c} style={{fontSize:9,background:"var(--card)",border:"1px solid var(--border)",borderRadius:20,padding:"2px 6px",color:"var(--muted)"}}>{getCropName(c,lang)}</span>;})}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab==="storage"&&(
        <div>
          <div style={{padding:"0 13px 9px"}}><div className="flabel">{t.cropLabel}</div><select className="finput" value={stcrop} onChange={function(e){setStcrop(e.target.value);}}>{CROPS.map(function(c){return <option key={c} value={c}>{getCropName(c,lang)}</option>;})}</select></div>
          <div className="card">
            <div className="card-title">{t.storage} · {getCropName(stcrop,lang)}</div>
            {[[t.shelfLife,sr.shelf[lang]||sr.shelf.en,<Clock size={13}/>,null],[t.moistureRisk,sr.moisture==="HIGH_RISK"?t.moistureHighRisk:sr.moisture==="LOW_RISK"?t.moistureLowRisk:t.moistureMedium,<Droplets size={13}/>,sr.moisture==="HIGH_RISK"?"var(--red)":sr.moisture==="LOW_RISK"?"var(--green)":"var(--amber)"],[t.storageDays,sr.days+" "+t.daysUnit,<Package size={13}/>,null]].map(function(row){
              return <div key={row[0]} style={{display:"flex",alignItems:"center",gap:9,marginBottom:12}}><div className="micon">{row[2]}</div><div style={{flex:1}}><div style={{fontSize:10,color:"var(--muted)"}}>{row[0]}</div><div style={{fontSize:13,fontWeight:500,marginTop:1,color:row[3]||"var(--cream)"}}>{row[1]}</div></div></div>;
            })}
            <div className="sbar2"><div className="sbar2f" style={{width:Math.min(100,sr.days/7.2)+"%"}}/></div>
          </div>
          <div className="card"><div className="card-title">{t.tip}</div><div style={{fontSize:12,color:"var(--muted)",lineHeight:1.6}}>{sr.tip[lang]||sr.tip.en}</div></div>
        </div>
      )}

      {tab==="calendar"&&(
        <div>
          <div style={{padding:"0 13px 9px"}}><div className="flabel">{t.cropLabel}</div><select className="finput" value={calcrop} onChange={function(e){setCalcrop(e.target.value);}}>{CROPS.map(function(c){return <option key={c} value={c}>{getCropName(c,lang)}</option>;})}</select></div>
          <div className="card">
            <div className="card-title">{t.cropCalendar} · {getCropName(calcrop,lang)}</div>
            {[[t.sow,cal.sow,"🌱"],[t.harvest,cal.harvest,"🌾"],[t.bestSell,cal.bestSell,"💰"]].map(function(row){
              return <div key={row[0]} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:"1px solid var(--border)"}}><div style={{width:32,fontSize:10,color:"var(--muted)",textAlign:"right",paddingRight:4,fontWeight:600}}>{row[0].slice(0,4)}</div><div style={{flex:1}}><div style={{fontSize:10,color:"var(--muted)"}}>{row[0]}</div><div style={{fontSize:13,fontWeight:500,marginTop:2,color:"var(--cream)"}}>{row[1]}</div></div></div>;
            })}
          </div>
          <div className="shdr"><div className="stitle">{t.allCrops}</div></div>
          <div className="card">
            {CROPS.map(function(c){var ca=CROP_CALENDAR[c]||CROP_CALENDAR["Rice"];return <div key={c} style={{padding:"8px 0",borderBottom:"1px solid var(--border)"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:12,fontWeight:600,color:"var(--cream)"}}>{getCropName(c,lang)}</span><span style={{fontSize:10,background:"#2A2A1A",color:"var(--gold)",padding:"2px 7px",borderRadius:20,border:"1px solid #5A5A2A"}}>💰 {ca.bestSell}</span></div><div style={{fontSize:10,color:"var(--muted)"}}>🌱 {ca.sow}  ·  🌾 {ca.harvest}</div></div>;})}
          </div>
        </div>
      )}

      {tab==="convert"&&(
        <div>
          <div className="card">
            <div className="card-title">{t.convert}</div>
            <div style={{marginBottom:9}}><div className="flabel">{t.enterArea}</div><input className="finput" type="number" placeholder={t.areaPh} value={cv} onChange={function(e){setCv(e.target.value);setCr(null);}}/></div>
            <div style={{fontSize:11,color:"var(--muted)",marginBottom:6}}>{t.selectUnit}</div>
            <div className="cgrid">
              {[["guntha","unitGuntha"],["acre","unitAcre"],["bigha","unitBigha"],["cent","unitCent"]].map(function(row){
                return <div key={row[0]} className="cbtn" onClick={function(){conv(row[0]);}}><div style={{fontSize:12,fontWeight:600,color:"var(--cream)",marginBottom:2}}>{t[row[1]]||row[0]}</div><div>{t.convertTo}</div></div>;
              })}
            </div>
            {cr&&<div className="cres"><div style={{fontSize:10,color:"var(--muted)",marginBottom:3}}>{cv} {t[cr.labelKey]||cr.labelKey} =</div><div className="cresval">{cr.acres} {t.acresUnit}</div><div style={{fontSize:12,color:"var(--muted)",marginTop:3}}>= {cr.ha} {t.hectaresUnit}</div></div>}
          </div>
          <div className="card">
            <div className="card-title">{t.quickRef}</div>
            {[[t.ref1a,t.ref1b],[t.ref2a,t.ref2b],[t.ref3a,t.ref3b],[t.ref4a,t.ref4b]].map(function(row){
              return <div key={row[0]} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid var(--border)",fontSize:12}}><span style={{color:"var(--cream)",fontWeight:500}}>{row[0]}</span><span style={{color:"var(--muted)"}}>{row[1]}</span></div>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── LANG DROP + SETTINGS MODAL ───────────────────────────────

function LangDrop(props) {
  var lang=props.lang,setLang=props.setLang,onClose=props.onClose;
  return (
    <div className="lddrop">
      {Object.entries(LANG_LABELS).map(function(entry){
        var code=entry[0],label=entry[1];
        return (
          <div key={code} className={"lditem"+(lang===code?" active":"")}
            onClick={function(){setLang(code);try{localStorage.setItem("cm_lang",code);}catch(e){}onClose();}}>
            {lang===code&&<Check size={11} color="var(--gold)"/>}
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function SettingsModal(props) {
  var dataGovKey=props.dataGovKey,onSave=props.onSave,onClose=props.onClose;
  var fetchStatus=props.fetchStatus,t=props.t,lang=props.lang,setLang=props.setLang;
  var r0=useState(dataGovKey),key=r0[0],setKey=r0[1];
  var r1=useState(""),csvText=r1[0],setCsvText=r1[1];
  var r2=useState(""),csvMsg=r2[0],setCsvMsg=r2[1];

  var importCSV = function() {
    try {
      var rows = csvText.trim().split("\n").map(function(row) {
        var p = row.split(",").map(function(x){return x.trim().replace(/^"|"$/g,"");});
        return {state:p[0],district:p[1],market:p[2],commodity:p[4],min:parseFloat(p[7])||0,max:parseFloat(p[8])||0,modal:parseFloat(p[9])||0,date:p[11]||""};
      }).filter(function(r){return r.state&&r.commodity&&r.modal>0&&r.date;});
      if (!rows.length){setCsvMsg("❌ No valid rows. Check format.");return;}
      var grouped={};
      rows.forEach(function(r){
        var k=r.state+"||"+r.commodity;
        if(!grouped[k])grouped[k]={state:r.state,crop:r.commodity,records:[]};
        var dd=r.date.split("-").reverse().join("-").replace(/\//g,"-");
        var d2=dd.match(/^\d{4}/)?dd:r.date.split("/").reverse().join("-");
        grouped[k].records.push({date:d2,price:r.modal,min:r.min,max:r.max,market:r.market});
      });
      var ALIAS={"Green Chilli":"Chilli","Ginger(Green)":"Ginger","Paddy(Common)":"Rice","Ground Nut":"Groundnut","Dry Chillies":"Chilli"};
      var imported=0;
      Object.values(grouped).forEach(function(g){
        var appCrop=ALIAS[g.crop]||g.crop;
        if(TRACKED_CROPS.indexOf(appCrop)<0)return;
        saveHistory(g.state,appCrop,g.records);
        imported+=g.records.length;
      });
      setCsvMsg("✅ Imported "+imported+" records.");setCsvText("");
    } catch(e){setCsvMsg("❌ Parse error: "+e.message);}
  };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px 20px",backdropFilter:"blur(4px)"}}>
      <div style={{background:"var(--surface)",borderRadius:18,width:"100%",maxWidth:500,maxHeight:"90vh",display:"flex",flexDirection:"column",border:"1px solid var(--border)",boxShadow:"0 24px 64px rgba(0,0,0,.6)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 20px 14px",borderBottom:"1px solid var(--border)",flexShrink:0}}>
          <div style={{fontWeight:700,fontSize:15,color:"var(--cream)"}}>Settings</div>
          <div style={{cursor:"pointer",color:"var(--muted)",fontSize:18}} onClick={onClose}>✕</div>
        </div>
        <div style={{padding:"16px 20px",overflowY:"auto",flex:1}}>
          <div style={{background:"var(--card)",borderRadius:10,padding:12,marginBottom:10}}>
            <div style={{fontSize:11,fontWeight:700,color:"var(--muted)",letterSpacing:1,marginBottom:8}}>🌐 LANGUAGE</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
              {Object.entries(LANG_LABELS).map(function(entry){
                var code=entry[0],label=entry[1],sel=lang===code;
                return (
                  <div key={code} onClick={function(){setLang(code);try{localStorage.setItem("cm_lang",code);}catch(e){}}}
                    style={{padding:"9px 11px",borderRadius:9,cursor:"pointer",display:"flex",alignItems:"center",gap:7,
                      border:sel?"1.5px solid var(--gold)":"1.5px solid var(--border)",
                      background:sel?"rgba(255,193,7,.08)":"transparent",transition:"all .15s"}}>
                    <span style={{fontSize:16}}>{code==="en"?"🇬🇧":code==="hi"?"🇮🇳":code==="te"?"🌿":"🌺"}</span>
                    <div style={{flex:1}}><div style={{fontSize:12,fontWeight:sel?700:400,color:sel?"var(--gold)":"var(--text)"}}>{label}</div></div>
                    {sel&&<div style={{width:7,height:7,borderRadius:"50%",background:"var(--gold)",flexShrink:0}}/>}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{background:"var(--card)",borderRadius:10,padding:12,marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{fontSize:13,fontWeight:600,color:"var(--cream)"}}>📍 Mandi Locations</div><div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>OpenStreetMap · No key needed</div></div>
              <div style={{fontSize:11,padding:"3px 9px",borderRadius:20,background:fetchStatus.markets==="done"?"rgba(76,175,80,.2)":"rgba(255,255,255,.08)",color:fetchStatus.markets==="done"?"#81C784":"var(--muted)"}}>{fetchStatus.markets==="done"?"Live":fetchStatus.markets==="loading"?"Fetching…":"Auto"}</div>
            </div>
          </div>
          <div style={{background:"var(--card)",borderRadius:10,padding:12,marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{fontSize:13,fontWeight:600,color:"var(--cream)"}}>🌤 Weather</div><div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>Open-Meteo · No key needed</div></div>
              <div style={{fontSize:11,padding:"3px 9px",borderRadius:20,background:fetchStatus.weather==="done"?"rgba(76,175,80,.2)":"rgba(255,193,7,.15)",color:fetchStatus.weather==="done"?"#81C784":"#FFD54F"}}>{fetchStatus.weather==="done"?"Live":fetchStatus.weather==="loading"?"Fetching…":"Auto"}</div>
            </div>
          </div>
          <div style={{background:"var(--card)",borderRadius:10,padding:12,marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{fontSize:13,fontWeight:600,color:"var(--cream)"}}>Agri News</div><div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>RSS feeds · Auto</div></div>
              <div style={{fontSize:11,padding:"3px 9px",borderRadius:20,background:fetchStatus.news==="done"?"rgba(76,175,80,.2)":"rgba(255,193,7,.15)",color:fetchStatus.news==="done"?"#81C784":"#FFD54F"}}>{fetchStatus.news==="done"?"Live":fetchStatus.news==="loading"?"Fetching…":"Auto"}</div>
            </div>
          </div>
          <div style={{background:"var(--card)",borderRadius:10,padding:12,marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div><div style={{fontSize:13,fontWeight:600,color:"var(--cream)"}}>💰 Mandi Prices</div><div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>data.gov.in Agmarknet</div></div>
              <div style={{fontSize:11,padding:"3px 9px",borderRadius:20,background:fetchStatus.prices==="done"?"rgba(76,175,80,.2)":"rgba(255,193,7,.15)",color:fetchStatus.prices==="done"?"#81C784":"#FFD54F"}}>{fetchStatus.prices==="done"?"Live":fetchStatus.prices==="loading"?"Fetching…":"Active"}</div>
            </div>
            <input style={{width:"100%",background:"var(--bg)",border:"1px solid var(--border)",borderRadius:8,padding:"8px 10px",fontSize:12,color:"var(--cream)",outline:"none",boxSizing:"border-box"}}
              placeholder="Optional: paste your own API key"
              value={key==="579b464db66ec23bdd0000011e0d03b39b2e4b304252db30723d3a30"?"":key}
              onChange={function(e){setKey(e.target.value||"579b464db66ec23bdd0000011e0d03b39b2e4b304252db30723d3a30");}}/>
          </div>
          <div style={{background:"var(--card)",borderRadius:10,padding:12,marginBottom:12}}>
            <div style={{fontSize:11,fontWeight:700,color:"var(--muted)",letterSpacing:1,marginBottom:6}}>📊 IMPORT PRICE CSV</div>
            {csvMsg&&<div style={{padding:"8px 10px",borderRadius:8,marginBottom:8,fontSize:12,background:csvMsg.indexOf("✅")>=0?"rgba(76,175,80,.15)":"rgba(229,57,53,.12)",color:csvMsg.indexOf("✅")>=0?"var(--green)":"#EF9A9A"}}>{csvMsg}</div>}
            <textarea value={csvText} onChange={function(e){setCsvText(e.target.value);}} placeholder={"Paste agmarknet.gov.in CSV rows here..."}
              style={{width:"100%",minHeight:80,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,padding:"8px 10px",color:"var(--text)",fontSize:11,fontFamily:"monospace",resize:"vertical",boxSizing:"border-box"}}/>
            <button onClick={importCSV} style={{marginTop:6,width:"100%",padding:"8px 0",borderRadius:8,border:"none",background:"rgba(255,193,7,.15)",color:"var(--gold)",fontWeight:700,cursor:"pointer",fontSize:12}}>📥 Import CSV Data</button>
          </div>
          <div style={{marginBottom:8}}>
            <button onClick={function(){try{localStorage.removeItem("cm_boarded");localStorage.removeItem("cm_district");localStorage.removeItem("cm_lang");}catch(e){}window.location.reload();}}
              style={{width:"100%",padding:"9px 0",borderRadius:10,border:"1px solid rgba(229,57,53,.4)",background:"rgba(229,57,53,.08)",color:"#EF9A9A",fontWeight:600,cursor:"pointer",fontSize:12}}>
              🔄 Reset Setup (Language and Location)
            </button>
          </div>
        </div>
        <div style={{padding:"10px 20px 18px",borderTop:"1px solid var(--border)",flexShrink:0}}>
          <div style={{display:"flex",gap:8}}>
            <button onClick={onClose} style={{flex:1,padding:"10px 0",borderRadius:10,border:"1px solid var(--border)",background:"transparent",color:"var(--muted)",cursor:"pointer",fontSize:13}}>Cancel</button>
            <button onClick={function(){onSave(key);onClose();}} style={{flex:2,padding:"10px 0",borderRadius:10,border:"none",background:"var(--gold)",color:"#000",fontWeight:700,cursor:"pointer",fontSize:13}}>Save & Fetch</button>
          </div>
        </div>
      </div>
    </div>
  );
}


const TG_PRICES = {
  // Onion: 15-day history from CSV (agmarknet.gov.in, Bowenpally APMC)
  Onion: {
    modal:1000, min:800, max:1200, trend:"down", arrivals:"NORMAL",
    market:"Bowenpally APMC", date:"14-03-2026", live:true,
    history:[
      {date:"2026-03-01",price:1000},{date:"2026-03-02",price:1200},
      {date:"2026-03-05",price:1100},{date:"2026-03-06",price:1100},
      {date:"2026-03-07",price:1200},{date:"2026-03-08",price:1200},
      {date:"2026-03-09",price:1200},{date:"2026-03-10",price:1200},
      {date:"2026-03-11",price:1100},{date:"2026-03-12",price:1100},
      {date:"2026-03-13",price:1100},{date:"2026-03-14",price:1000},
    ],
    weekAvg:1100, monthAvg:1117,
  },
  // Chilli: 15-day history from CSV (Bowenpally APMC)
  Chilli: {
    modal:1300, min:1000, max:3500, trend:"down", arrivals:"NORMAL",
    market:"Bowenpally APMC", date:"14-03-2026", live:true,
    history:[
      {date:"2026-03-01",price:2000},{date:"2026-03-02",price:2200},
      {date:"2026-03-05",price:2500},{date:"2026-03-06",price:2500},
      {date:"2026-03-07",price:2200},{date:"2026-03-09",price:1800},
      {date:"2026-03-10",price:3500},{date:"2026-03-11",price:1800},
      {date:"2026-03-12",price:1800},{date:"2026-03-13",price:1400},
      {date:"2026-03-14",price:1300},
    ],
    weekAvg:1720, monthAvg:2000,
  },
  // From agmarknet.gov.in Bowenpally APMC screenshot Mar 13 2026
  Tomato:   {modal:550,  min:400, max:800,  trend:"down",arrivals:"HIGH",  market:"Bowenpally APMC", date:"13-03-2026",live:true,history:[],weekAvg:550, monthAvg:580},
  Potato:   {modal:757,  min:600, max:900,  trend:"flat",arrivals:"NORMAL",market:"Bowenpally APMC", date:"13-03-2026",live:true,history:[],weekAvg:757, monthAvg:770},
  // Hyderabad market prices (Gudimalkapur APMC — largest F&V market in South India)
  Garlic:   {modal:14000,min:10000,max:16000,trend:"up",  arrivals:"LOW",  market:"Gudimalkapur APMC",date:"14-03-2026",live:true,history:[],weekAvg:14000,monthAvg:13500},
  Brinjal:  {modal:1500, min:1000,max:2500,  trend:"flat",arrivals:"NORMAL",market:"Bowenpally APMC", date:"13-03-2026",live:true,history:[],weekAvg:1500, monthAvg:1600},
  Banana:   {modal:2500, min:1800,max:4000,  trend:"flat",arrivals:"NORMAL",market:"Bowenpally APMC", date:"13-03-2026",live:true,history:[],weekAvg:2500, monthAvg:2600},
  Ginger:   {modal:6000, min:4000,max:9000,  trend:"flat",arrivals:"NORMAL",market:"Gudimalkapur APMC",date:"14-03-2026",live:true,history:[],weekAvg:6000, monthAvg:6200},
};


export default function CropMarket() {
  var r0=useState(function(){try{return !!(localStorage.getItem("cm_boarded")&&localStorage.getItem("cm_district"));}catch(e){return false;}});
  var boarded=r0[0],setBoarded=r0[1];
  var r1=useState(function(){try{return localStorage.getItem("cm_lang")||"en";}catch(e){return "en";}});
  var lang=r1[0],setLang=r1[1];
  var r2=useState(function(){try{var s=localStorage.getItem("cm_district");return s?JSON.parse(s):null;}catch(e){return null;}});
  var district=r2[0],setDistrict=r2[1];
  var r3=useState("home"); var activeTab=r3[0],setTab=r3[1];
  var r4=useState("Tomato"); var crop=r4[0],setCrop=r4[1];
  var r5=useState(["Tomato","Rice","Wheat"]); var watchlist=r5[0],setWL=r5[1];
  var r6=useState([{id:1,crop:"Tomato",type:"above",price:2000,active:true},{id:2,crop:"Rice",type:"below",price:2100,active:true}]);
  var alerts=r6[0],setAlerts=r6[1];
  var r7=useState(false); var showLang=r7[0],setShowLang=r7[1];
  var r8=useState(null);  var liveWeather=r8[0],setLiveWeather=r8[1];
  var r9=useState({});    var livePrices=r9[0],setLivePrices=r9[1];
  var r10=useState([]);   var liveNews=r10[0],setLiveNews=r10[1];
  var r11=useState([]);   var liveMarkets=r11[0],setLiveMarkets=r11[1];
  var r12=useState(function(){try{return localStorage.getItem("cropmarket_datagov_key")||"579b464db66ec23bdd0000011e0d03b39b2e4b304252db30723d3a30";}catch(e){return "579b464db66ec23bdd0000011e0d03b39b2e4b304252db30723d3a30";}});
  var dataGovKey=r12[0],setDataGovKey=r12[1];
  var r13=useState(false); var showSettings=r13[0],setShowSettings=r13[1];
  var r14=useState({weather:"idle",prices:"idle",news:"idle",markets:"idle"});
  var fetchStatus=r14[0],setFetchStatus=r14[1];

  var t = T[lang];

  // ── Weather ──────────────────────────────────────────────────
  useEffect(function() {
    if (!district) return;
    var coords = DISTRICT_COORDS[district.name];
    if (!coords) {
      var caps = {"Andhra Pradesh":[15.9,79.7],"Telangana":[17.38,78.49],"Tamil Nadu":[13.08,80.27],"Karnataka":[12.97,77.59],"Kerala":[8.52,76.94],"Maharashtra":[19.07,72.87],"Gujarat":[23.03,72.58],"Rajasthan":[26.91,75.79],"Madhya Pradesh":[23.25,77.41],"Uttar Pradesh":[26.85,80.95],"Punjab":[30.90,75.85],"Haryana":[28.47,77.03],"West Bengal":[22.57,88.36],"Bihar":[25.60,85.14],"Odisha":[20.30,85.82],"Assam":[26.14,91.74]};
      coords = caps[district.state];
    }
    if (!coords) return;
    var lat=coords.length===3?coords[1]:coords[0], lon=coords.length===3?coords[2]:coords[1];
    setFetchStatus(function(s){return Object.assign({},s,{weather:"loading"});});
    fetch("https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+lon+"&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max,weathercode,uv_index_max&timezone=Asia%2FKolkata&forecast_days=7")
    .then(function(r){return r.json();})
    .then(function(json){
      var d=json.daily; if(!d) return;
      var wmo=function(c){return c===0?"sun":c<=3?"cloud":(c>=51&&c<=67)||(c>=80&&c<=82)||c>=95?"rain":"cloud";};
      var days=d.time.map(function(_,i){return {date:d.time[i],tempMax:Math.round(d.temperature_2m_max[i]),tempMin:Math.round(d.temperature_2m_min[i]),temp:Math.round(d.temperature_2m_max[i]),rain:Math.round(d.precipitation_probability_max[i]||0),wind:Math.round(d.windspeed_10m_max[i]||0),uv:Math.round((d.uv_index_max&&d.uv_index_max[i])||0),icon:wmo(d.weathercode[i]||0)};});
      var harvestRisk=days.slice(0,4).some(function(x){return x.rain>60;});
      setLiveWeather({days:days,harvestRisk:harvestRisk,source:"Open-Meteo"});
      setFetchStatus(function(s){return Object.assign({},s,{weather:"done"});});
    }).catch(function(){setFetchStatus(function(s){return Object.assign({},s,{weather:"error"});});});
  }, [district]);

  // ── News ─────────────────────────────────────────────────────
  useEffect(function() {
    setFetchStatus(function(s){return Object.assign({},s,{news:"loading"});});
    var parseXML=function(xml,src){
      try {
        var doc=new DOMParser().parseFromString(xml,"text/xml");
        if(doc.querySelector("parsererror"))return[];
        return Array.from(doc.querySelectorAll("item")).slice(0,6).map(function(el){
          var g=function(tag){return(el.getElementsByTagName(tag)[0]&&el.getElementsByTagName(tag)[0].textContent||"").replace(/<!\[CDATA\[|\]\]>/g,"").trim();};
          var raw=g("description")||g("content:encoded")||"";
          var desc=raw.replace(/<[^>]+>/g,"").replace(/&[a-z#0-9]+;/gi," ").replace(/\s+/g," ").trim().slice(0,180);
          return {title:g("title").replace(/&amp;/g,"&"),link:g("link")||g("guid")||"#",date:g("pubDate")||"",source:src,description:desc};
        }).filter(function(x){return x.title.length>5;});
      }catch(e){return[];}
    };
    var FEEDS=[
      {url:"https://www.thehindubusinessline.com/economy/agri-business/?service=rss",name:"BusinessLine"},
      {url:"https://www.financialexpress.com/agriculture/feed/",name:"Financial Express"},
      {url:"https://timesofindia.indiatimes.com/rssfeeds/4719148.cms",name:"Times of India"},
      {url:"https://www.downtoearth.org.in/rss/agriculture",name:"Down to Earth"},
    ];
    var FALLBACK=[
      {title:"MSP for Kharif crops announced by Cabinet",link:"https://pib.gov.in",date:new Date(Date.now()-86400000*2).toUTCString(),source:"Govt of India",description:"Cabinet approves minimum support prices for major kharif crops."},
      {title:"Tomato prices to stabilise as new crop arrives",link:"https://www.thehindubusinessline.com",date:new Date(Date.now()-86400000*3).toUTCString(),source:"BusinessLine",description:"Fresh arrivals expected to bring down retail prices."},
      {title:"PM Kisan 20th installment: Check your status",link:"https://pmkisan.gov.in",date:new Date(Date.now()-86400000*4).toUTCString(),source:"Govt of India",description:"Eligible farmers can check PM-KISAN beneficiary status on official portal."},
      {title:"Rabi crop sowing exceeds last year coverage",link:"https://financialexpress.com",date:new Date(Date.now()-86400000*5).toUTCString(),source:"Financial Express",description:"Total rabi sowing surpassed last year with wheat showing strong uptake."},
    ];
    var AGRI_KW=/farm|crop|harvest|mandi|kisan|agri|wheat|rice|tomato|onion|potato|maize|cotton|fertilizer|monsoon|rabi|kharif|msp|vegetable|livestock|dairy|farmer/i;
    var fetchFeed=function(feed){
      var proxies=["https://api.allorigins.win/raw?url="+encodeURIComponent(feed.url),"https://corsproxy.io/?"+encodeURIComponent(feed.url)];
      var tryProxy=function(idx){
        if(idx>=proxies.length)return Promise.resolve([]);
        return fetch(proxies[idx],{signal:AbortSignal.timeout(8000)}).then(function(r){return r.ok?r.text():Promise.reject("bad");}).then(function(txt){
          if(txt.indexOf("<item>")>=0)return parseXML(txt,feed.name);
          return tryProxy(idx+1);
        }).catch(function(){return tryProxy(idx+1);});
      };
      return fetch(feed.url,{signal:AbortSignal.timeout(5000)}).then(function(r){return r.ok?r.text():Promise.reject("cors");}).then(function(t){return t.indexOf("<item>")>=0?parseXML(t,feed.name):tryProxy(0);}).catch(function(){return tryProxy(0);});
    };
    Promise.allSettled(FEEDS.map(fetchFeed)).then(function(results){
      var all=results.reduce(function(acc,r){return r.status==="fulfilled"?acc.concat(r.value):acc;},[]);
      var seen={};
      var deduped=(all||[]).filter(function(x){if(!x.title||seen[x.title])return false;seen[x.title]=true;return true;});
      var filtered=deduped.filter(function(x){return["Govt of India","Krishi Jagran"].indexOf(x.source)>=0||AGRI_KW.test(x.title)||AGRI_KW.test(x.description||"");});
      var final=(filtered.length>=2?filtered:deduped).sort(function(a,b){return new Date(b.date||0)-new Date(a.date||0);});
      setLiveNews(final.length>0?final.slice(0,12):FALLBACK);
      setFetchStatus(function(s){return Object.assign({},s,{news:"done"});});
    });
  }, []);

  // ── Markets ──────────────────────────────────────────────────
  useEffect(function() {
    if (!district) return;
    var coords=DISTRICT_COORDS[district.name];
    if (!coords) return;
    var lat=coords.length===3?coords[1]:coords[0], lon=coords.length===3?coords[2]:coords[1];
    setFetchStatus(function(s){return Object.assign({},s,{markets:"loading"});});
    var q="[out:json][timeout:25];(node[\"amenity\"=\"marketplace\"](around:50000,"+lat+","+lon+");way[\"amenity\"=\"marketplace\"](around:50000,"+lat+","+lon+");node[\"name\"~\"APMC|mandi|Rythu\"](around:50000,"+lat+","+lon+"););out center tags 40;";
    fetch("https://overpass-api.de/api/interpreter",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"data="+encodeURIComponent(q),signal:AbortSignal.timeout(28000)})
    .then(function(r){return r.text();}).then(function(txt){
      try{var json=JSON.parse(txt);}catch(e){throw new Error("XML response");}
      var REJECT=["school","college","university","hospital","hotel","circle","temple","mandir","church","mosque","police","park","mall","cinema","tower","colony","road","junction"];
      var els=json.elements||[];
      var mkts=els.map(function(el){
        var eLat=el.lat||(el.center&&el.center.lat), eLon=el.lon||(el.center&&el.center.lon);
        if(!eLat||!eLon)return null;
        var name=el.tags&&(el.tags.name||el.tags["name:en"]||el.tags["name:te"]||el.tags["name:hi"])||"Market";
        var raw=name.toLowerCase();
        var reject=REJECT.some(function(w){return raw.indexOf(w)>=0;});
        var isGood=raw.indexOf("apmc")>=0||raw.indexOf("mandi")>=0||raw.indexOf("rythu")>=0||raw.indexOf("market")>=0||raw.indexOf("sabzi")>=0||(el.tags&&el.tags.amenity==="marketplace");
        if(reject&&!isGood)return null;
        var km=haversine(lat,lon,eLat,eLon);
        var off=raw.indexOf("apmc")>=0?60:raw.indexOf("rythu")>=0?40:raw.indexOf("mandi")>=0?-20:0;
        return {name:name,km:km,lat:eLat,lon:eLon,type:raw.indexOf("apmc")>=0?"APMC Hub":raw.indexOf("rythu")>=0?"Rythu Bazaar":"Market",priceOffset:off,rating:(raw.indexOf("apmc")>=0||km<3)?"BEST":km<15?"GOOD":"AVG"};
      }).filter(Boolean).sort(function(a,b){return a.km-b.km;}).slice(0,20);
      if(mkts.length>=2){setLiveMarkets(mkts);setFetchStatus(function(s){return Object.assign({},s,{markets:"done"});});}
      else setFetchStatus(function(s){return Object.assign({},s,{markets:"no-data"});});
    }).catch(function(){setFetchStatus(function(s){return Object.assign({},s,{markets:"error"});});});
  }, [district]);

  // ── Prices ───────────────────────────────────────────────────
  useEffect(function() {
    if (!district) return;
    var coords=DISTRICT_COORDS[district.name];
    var stateName=coords&&coords.length===3?coords[0]:null;
    var isTelangana=stateName==="Telangana";
    var today=new Date().toISOString().slice(0,10);
    var cacheKey="cm_fetch_"+(stateName||district.name).replace(/\s+/g,"_")+"_"+today;
    try{if(localStorage.getItem(cacheKey)==="done"&&Object.keys(livePrices).length>=5){setFetchStatus(function(s){return Object.assign({},s,{prices:"done"});});return;}}catch(e){}
    setFetchStatus(function(s){return Object.assign({},s,{prices:"loading"});});
    var KEY=dataGovKey, BASE="https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";
    var CMAP={Tomato:"Tomato",Onion:"Onion",Potato:"Potato",Rice:"Rice",Wheat:"Wheat",Maize:"Maize",Cotton:"Cotton",Groundnut:"Groundnut",Chilli:"Green Chilli",Soybean:"Soybean",Garlic:"Garlic",Ginger:"Ginger(Green)",Brinjal:"Brinjal",Banana:"Banana",Mustard:"Mustard"};
    var APINAMES={};
    Object.keys(CMAP).forEach(function(k){APINAMES[CMAP[k]]=k;});
    var parseDate=function(d){if(!d)return"";var p=d.split("/");return p.length===3?p[2]+"-"+(p[1].length<2?"0"+p[1]:p[1])+"-"+(p[0].length<2?"0"+p[0]:p[0]):d;};
    var processRecords=function(records,batchState){
      var byCrop={};
      records.forEach(function(r){if(APINAMES[r.commodity]){if(!byCrop[r.commodity])byCrop[r.commodity]=[];byCrop[r.commodity].push(r);}});
      var updates={};
      Object.keys(byCrop).forEach(function(apiName){
        var appName=APINAMES[apiName]; var recs=byCrop[apiName]; if(!recs.length)return;
        var sorted=recs.slice().sort(function(a,b){return new Date(parseDate(b.arrival_date))-new Date(parseDate(a.arrival_date));});
        var history=sorted.map(function(r){return {date:parseDate(r.arrival_date),price:parseFloat(r.modal_price||0)};}).filter(function(h){return h.price>0;});
        if(!history.length)return;
        var modal=history[0].price;
        var slope=history.length>1?history[0].price-history[Math.min(6,history.length-1)].price:0;
        if(TRACKED_CROPS.indexOf(appName)>=0){
          var newRecords=history.map(function(h){return {date:h.date,price:h.price,min:h.price*0.85,max:h.price*1.15,market:sorted[0].market||""};});
          var fullHist=saveHistory(batchState,appName,newRecords);
          var pred=predictPrices(fullHist,appName,7);
          var pCtx=getPriceContext(fullHist,modal);
          var allPrices=fullHist.map(function(h){return h.price;}).filter(function(p){return p>0;});
          var realCount=(fullHist||[]).filter(function(h){return !h.seeded;}).length;
          updates[appName]={modal:modal,live:true,min:parseFloat(sorted[0].min_price||modal*0.85),max:parseFloat(sorted[0].max_price||modal*1.15),trend:slope>100?"up":slope<-100?"down":"flat",market:sorted[0].market||"",date:history[0].date,arrivals:"NORMAL",history:fullHist.slice(-60),weekAvg:allPrices.length>=7?Math.round(allPrices.slice(-7).reduce(function(a,b){return a+b;},0)/7):Math.round(modal),monthAvg:allPrices.length>=30?Math.round(allPrices.slice(-30).reduce(function(a,b){return a+b;},0)/30):Math.round(modal),prediction:pred,predConfidence:realCount>14?78:58,slope:slope,priceContext:pCtx};
        } else {
          updates[appName]={modal:modal,live:true,min:parseFloat(sorted[0].min_price||modal*0.85),max:parseFloat(sorted[0].max_price||modal*1.15),trend:slope>100?"up":slope<-100?"down":"flat",market:sorted[0].market||"",date:history[0].date,arrivals:"NORMAL",history:history.slice(0,30),weekAvg:Math.round(history.slice(0,7).map(function(h){return h.price;}).reduce(function(a,b){return a+b;},0)/Math.min(7,history.length)),monthAvg:Math.round(history.map(function(h){return h.price;}).reduce(function(a,b){return a+b;},0)/history.length),prediction:[],predConfidence:0,slope:slope};
        }
      });
      return updates;
    };
    var loadPrices=function(){
      if(isTelangana){
        var tgUpdates={};
        Object.keys(TG_PRICES).forEach(function(crop){
          var data=TG_PRICES[crop];
          if(TRACKED_CROPS.indexOf(crop)>=0&&data.history&&data.history.length>0){
            var tgRecs=data.history.map(function(h){return {date:h.date,price:h.price,min:data.min,max:data.max,market:data.market||"Bowenpally APMC"};});
            var fh=saveHistory("Telangana",crop,tgRecs);
            var pred=predictPrices(fh,crop,7);
            tgUpdates[crop]=Object.assign({},data,{history:fh.slice(-60),prediction:pred,priceContext:getPriceContext(fh,data.modal),predConfidence:(fh||[]).filter(function(h){return !h.seeded;}).length>7?72:55});
          } else {tgUpdates[crop]=data;}
        });
        setLivePrices(function(prev){return Object.assign({},prev,tgUpdates);});
        setFetchStatus(function(s){return Object.assign({},s,{prices:"done"});});
        try{localStorage.setItem(cacheKey,"done");}catch(e){}
        return;
      }
      var enc=encodeURIComponent;
      var realDays=TRACKED_CROPS.reduce(function(max,c){var h=loadHistory(stateName||"National",c);return Math.max(max,(h||[]).filter(function(x){return !x.seeded;}).length);},0);
      var offsets=realDays<30?[0,500,1000,1500,2000]:[0];
      var allUpdates={};
      var fetchNext=function(idx){
        if(idx>=offsets.length){
          if(Object.keys(allUpdates).length>0){
            setLivePrices(function(prev){return Object.assign({},prev,allUpdates);});
            setFetchStatus(function(s){return Object.assign({},s,{prices:"done"});});
            try{localStorage.setItem(cacheKey,"done");}catch(e){}
          } else {setFetchStatus(function(s){return Object.assign({},s,{prices:"no-data"});});}
          return;
        }
        var offset=offsets[idx];
        var stateFilter=stateName?("&filters%5Bstate%5D="+enc(stateName)):"";
        var url=BASE+"?api-key="+KEY+"&format=json&limit=500&offset="+offset+stateFilter;
        fetch(url,{signal:AbortSignal.timeout(15000)}).then(function(r){return r.text();}).then(function(txt){
          try{
            var parsed=JSON.parse(txt);
            var recs=parsed.records||[];
            if(recs.length>0){var batch=processRecords(recs,stateName||"National");Object.assign(allUpdates,batch);}
          }catch(e){}
          fetchNext(idx+1);
        }).catch(function(){fetchNext(idx+1);});
      };
      fetchNext(0);
    };
    loadPrices();
  }, [district,dataGovKey]);

  var weather   = liveWeather || WEATHER;
  var ttt       = T[lang];
  var mrkts     = fetchStatus.markets==="loading"?[]:(getMarkets(district?district.name:"Kurnool",ttt,liveMarkets)||[]);
  var tabs=[{id:"home",icon:<Home size={18}/>,label:ttt.home},{id:"markets",icon:<BarChart2 size={18}/>,label:ttt.markets},{id:"trip",icon:<Calculator size={18}/>,label:ttt.trip},{id:"watch",icon:<Star size={18}/>,label:ttt.watch},{id:"tools",icon:<Wrench size={18}/>,label:ttt.tools}];

  if (!boarded||!district) return (
    <>
      <style>{css}</style>
      <div className="onboard-wrap">
        <Onboarding onDone={function(res){
          setLang(res.lang);setDistrict(res.district);setBoarded(true);
          try{localStorage.setItem("cm_district",JSON.stringify(res.district));localStorage.setItem("cm_boarded","1");localStorage.setItem("cm_lang",res.lang);}catch(e){}
        }}/>
      </div>
    </>
  );

  return (
    <>
      <style>{css}</style>
      {showSettings&&<SettingsModal dataGovKey={dataGovKey} fetchStatus={fetchStatus} t={ttt} lang={lang} setLang={setLang}
        onSave={function(k){setDataGovKey(k);try{localStorage.setItem("cropmarket_datagov_key",k);}catch(e){}setLivePrices({});setFetchStatus(function(s){return Object.assign({},s,{prices:"idle"});});}}
        onClose={function(){setShowSettings(false);}}/>}
      <div className="app">
        <div className="topbar">
          <div className="logo">Crop<span>Market</span></div>
          <div className="topbar-right">
            <div className="dist-badge" onClick={function(){setBoarded(false);try{localStorage.removeItem("cm_boarded");localStorage.removeItem("cm_district");}catch(e){}}}>
              <MapPin size={9}/> {district?getDistrictName(district.name,lang):ttt.district}<ChevronDown size={9}/>
            </div>
            <div style={{position:"relative"}}>
              <div className="icon-btn" onClick={function(){setShowLang(function(v){return !v;});}}><Globe size={13}/></div>
              {showLang&&(
                <>
                  <div style={{position:"fixed",inset:0,zIndex:199}} onClick={function(){setShowLang(false);}}/>
                  <LangDrop lang={lang} setLang={setLang} onClose={function(){setShowLang(false);}}/>
                </>
              )}
            </div>
            <Bell size={16} color="var(--muted)" style={{cursor:"pointer"}}/>
            <div className="icon-btn" onClick={function(){setShowSettings(true);}} title="Settings"><SettingsIcon size={16}/></div>
          </div>
        </div>
        <div className="app-body">
          <nav className="sidebar">
            {tabs.map(function(tab){return <button key={tab.id} className={"sb-btn"+(activeTab===tab.id?" active":"")} onClick={function(){setTab(tab.id);}}>{tab.icon}<span>{tab.label}</span></button>;})}
            <div className="sb-divider"/>
            <div className="sb-district">{district?getDistrictName(district.name,lang)+" · "+getStateName(district.state,lang):""}</div>
          </nav>
          <div className="content">
            {activeTab==="home"&&<HomeScreen crop={crop} setCrop={setCrop} lang={lang} district={district} markets={mrkts} t={ttt} livePrices={livePrices} weather={weather} fetchStatus={fetchStatus} liveNews={liveNews}/>}
            {activeTab==="markets"&&<MarketsScreen crop={crop} setCrop={setCrop} lang={lang} district={district} markets={mrkts} t={ttt} livePrices={livePrices} fetchStatus={fetchStatus}/>}
            {activeTab==="trip"&&<TripScreen crop={crop} markets={mrkts} lang={lang} t={ttt} livePrices={livePrices} fetchStatus={fetchStatus}/>}
            {activeTab==="watch"&&<WatchScreen watchlist={watchlist} setWatchlist={setWL} alerts={alerts} setAlerts={setAlerts} lang={lang} t={ttt} livePrices={livePrices}/>}
            {activeTab==="tools"&&<ToolsScreen crop={crop} lang={lang} t={ttt} livePrices={livePrices} weather={weather} liveWeather={liveWeather} liveNews={liveNews} fetchStatus={fetchStatus}/>}
          </div>
        </div>
        <div className="bottom-nav">
          {tabs.map(function(tab){return <button key={tab.id} className={"nav-btn"+(activeTab===tab.id?" active":"")} onClick={function(){setTab(tab.id);}}>{tab.icon}{tab.label}</button>;})}
        </div>
      </div>
    </>
  );
}
