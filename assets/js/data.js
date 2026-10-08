/* Dialing data — country code (cc), common international exit code (exit),
   national trunk prefix dropped when dialing from abroad (trunk), time zone label.
   Verify edge cases against the national regulator before relying on them. */
window.COUNTRIES = [
  {n:"Argentina",iso:"AR",cc:"54",exit:"00",trunk:"0",tz:"UTC−3"},
  {n:"Australia",iso:"AU",cc:"61",exit:"0011",trunk:"0",tz:"UTC+8 to +11"},
  {n:"Bangladesh",iso:"BD",cc:"880",exit:"00",trunk:"0",tz:"UTC+6"},
  {n:"Belgium",iso:"BE",cc:"32",exit:"00",trunk:"0",tz:"UTC+1"},
  {n:"Brazil",iso:"BR",cc:"55",exit:"00 + carrier",trunk:"0",tz:"UTC−2 to −5"},
  {n:"Canada",iso:"CA",cc:"1",exit:"011",trunk:"1",tz:"UTC−3.5 to −8"},
  {n:"China",iso:"CN",cc:"86",exit:"00",trunk:"0",tz:"UTC+8"},
  {n:"Denmark",iso:"DK",cc:"45",exit:"00",trunk:"",tz:"UTC+1"},
  {n:"Egypt",iso:"EG",cc:"20",exit:"00",trunk:"0",tz:"UTC+2"},
  {n:"France",iso:"FR",cc:"33",exit:"00",trunk:"0",tz:"UTC+1"},
  {n:"Germany",iso:"DE",cc:"49",exit:"00",trunk:"0",tz:"UTC+1"},
  {n:"Ghana",iso:"GH",cc:"233",exit:"00",trunk:"0",tz:"UTC+0"},
  {n:"Hong Kong",iso:"HK",cc:"852",exit:"001",trunk:"",tz:"UTC+8"},
  {n:"India",iso:"IN",cc:"91",exit:"00",trunk:"0",tz:"UTC+5:30"},
  {n:"Indonesia",iso:"ID",cc:"62",exit:"001",trunk:"0",tz:"UTC+7 to +9"},
  {n:"Ireland",iso:"IE",cc:"353",exit:"00",trunk:"0",tz:"UTC+0"},
  {n:"Israel",iso:"IL",cc:"972",exit:"00",trunk:"0",tz:"UTC+2"},
  {n:"Italy",iso:"IT",cc:"39",exit:"00",trunk:"",tz:"UTC+1"},
  {n:"Japan",iso:"JP",cc:"81",exit:"010",trunk:"0",tz:"UTC+9"},
  {n:"Kenya",iso:"KE",cc:"254",exit:"000",trunk:"0",tz:"UTC+3"},
  {n:"Malaysia",iso:"MY",cc:"60",exit:"00",trunk:"0",tz:"UTC+8"},
  {n:"Mexico",iso:"MX",cc:"52",exit:"00",trunk:"",tz:"UTC−6"},
  {n:"Nepal",iso:"NP",cc:"977",exit:"00",trunk:"0",tz:"UTC+5:45"},
  {n:"Netherlands",iso:"NL",cc:"31",exit:"00",trunk:"0",tz:"UTC+1"},
  {n:"New Zealand",iso:"NZ",cc:"64",exit:"00",trunk:"0",tz:"UTC+12"},
  {n:"Nigeria",iso:"NG",cc:"234",exit:"009",trunk:"0",tz:"UTC+1"},
  {n:"Norway",iso:"NO",cc:"47",exit:"00",trunk:"",tz:"UTC+1"},
  {n:"Pakistan",iso:"PK",cc:"92",exit:"00",trunk:"0",tz:"UTC+5"},
  {n:"Philippines",iso:"PH",cc:"63",exit:"00",trunk:"0",tz:"UTC+8"},
  {n:"Portugal",iso:"PT",cc:"351",exit:"00",trunk:"",tz:"UTC+0"},
  {n:"Saudi Arabia",iso:"SA",cc:"966",exit:"00",trunk:"0",tz:"UTC+3"},
  {n:"Singapore",iso:"SG",cc:"65",exit:"001",trunk:"",tz:"UTC+8"},
  {n:"South Africa",iso:"ZA",cc:"27",exit:"00",trunk:"0",tz:"UTC+2"},
  {n:"South Korea",iso:"KR",cc:"82",exit:"001",trunk:"0",tz:"UTC+9"},
  {n:"Spain",iso:"ES",cc:"34",exit:"00",trunk:"",tz:"UTC+1"},
  {n:"Sri Lanka",iso:"LK",cc:"94",exit:"00",trunk:"0",tz:"UTC+5:30"},
  {n:"Sweden",iso:"SE",cc:"46",exit:"00",trunk:"0",tz:"UTC+1"},
  {n:"Switzerland",iso:"CH",cc:"41",exit:"00",trunk:"0",tz:"UTC+1"},
  {n:"Thailand",iso:"TH",cc:"66",exit:"001",trunk:"0",tz:"UTC+7"},
  {n:"Turkey",iso:"TR",cc:"90",exit:"00",trunk:"0",tz:"UTC+3"},
  {n:"United Arab Emirates",iso:"AE",cc:"971",exit:"00",trunk:"0",tz:"UTC+4"},
  {n:"United Kingdom",iso:"GB",cc:"44",exit:"00",trunk:"0",tz:"UTC+0"},
  {n:"United States",iso:"US",cc:"1",exit:"011",trunk:"1",tz:"UTC−5 to −10"},
  {n:"Vietnam",iso:"VN",cc:"84",exit:"00",trunk:"0",tz:"UTC+7"}
];

/* Known "083" prefix usages worldwide */
window.PREFIX_083 = [
  {country:"Ireland",cc:"353",type:"Mobile",detail:"Ranges allocated to Three Ireland. Number portability means the current network may differ.",format:"083 XXX XXXX → +353 83 XXX XXXX"},
  {country:"South Africa",cc:"27",type:"Mobile",detail:"Ranges listed for MTN. Portability (since Nov 2006) means the current network may differ.",format:"083 XXX XXXX → +27 83 XXX XXXX"},
  {country:"India",cc:"91",type:"Landline (STD 083x)",detail:"STD codes starting 083 serve north Karnataka and Goa, e.g. Hubballi-Dharwad 0836.",format:"0836 XXXXXXX → +91 836 XXXXXXX"}
];

/* Chinese homophone readings per digit */
window.DIGIT_LORE = {
  "0":{zh:"零 líng",sound:"良 liáng — good; also wholeness and new beginnings",tone:"good"},
  "1":{zh:"一 yī",sound:"must / surely; unity and first place",tone:"good"},
  "2":{zh:"二 èr",sound:"pairs and harmony — ‘good things come in pairs’",tone:"good"},
  "3":{zh:"三 sān",sound:"生 shēng — life, birth (good); 散 sàn — separate (mixed)",tone:"mixed"},
  "4":{zh:"四 sì",sound:"close to 死 sǐ — death; widely avoided",tone:"bad"},
  "5":{zh:"五 wǔ",sound:"我 wǒ — me/self; also ‘none’ 无 wú",tone:"mixed"},
  "6":{zh:"六 liù",sound:"流 liú — flowing, smooth progress",tone:"good"},
  "7":{zh:"七 qī",sound:"起 qǐ — rise; or 气 qì — anger (mixed)",tone:"mixed"},
  "8":{zh:"八 bā",sound:"發 fā — prosper, wealth",tone:"good"},
  "9":{zh:"九 jiǔ",sound:"久 jiǔ — long-lasting",tone:"good"}
};

window.NUM_MEANINGS = {
  "0":"Potential, the infinite, a fresh cycle.",
  "1":"Initiative, leadership, beginnings.",
  "2":"Balance, partnership, diplomacy.",
  "3":"Creativity, expression, growth.",
  "4":"Structure, discipline, foundations.",
  "5":"Change, freedom, adventure.",
  "6":"Care, home, responsibility.",
  "7":"Analysis, introspection, wisdom.",
  "8":"Ambition, abundance, authority.",
  "9":"Completion, compassion, endings.",
  "11":"Master number — intuition and inspiration.",
  "22":"Master number — the master builder.",
  "33":"Master number — the teacher and healer."
};
