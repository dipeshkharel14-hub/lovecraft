export type Template = { id: string; name: string; emoji: string; title: string; message: string; reveal?: string };
export const templates: Template[] = [
  { id: "birthday", name: "Birthday Surprise", emoji: "🎂", title: "Happy Birthday!", message: "Today the world got brighter because you were born. I made this little surprise just for you.", reveal: "🎁 Your gift: a lifetime of my love." },
  { id: "apology", name: "Apology / Sorry Letter", emoji: "💌", title: "I'm Sorry", message: "I was wrong, and I hurt you. You deserve honesty and care, and I want to do better." },
  { id: "anniversary", name: "Anniversary", emoji: "💍", title: "Happy Anniversary", message: "Every day with you is my favorite chapter. Here's to us, and to all the pages still unwritten." },
  { id: "justbecause", name: "Just Because / Love Note", emoji: "💗", title: "Just Because", message: "No special day. I just wanted you to know you're on my mind and in my heart." },
  { id: "proposal", name: "Proposal", emoji: "💎", title: "Will You Marry Me?", message: "You are my home. Would you spend forever with me?", reveal: "💍 Say yes!" },
  { id: "breakup", name: "Breakup Letter", emoji: "🕊️", title: "A Gentle Goodbye", message: "I'm grateful for what we shared. This is hard, but I believe it's what's right for both of us. I wish you peace." },
  { id: "missing", name: "Missing You", emoji: "🌙", title: "Missing You", message: "The distance feels louder tonight. I'm counting the moments until I see you again." },
  { id: "longdistance", name: "Long Distance Love", emoji: "✈️", title: "Miles Mean Nothing", message: "Same moon, same sky, one heart. Every mile only shows how far I'd go for you." },
  { id: "makeup", name: "Make-up After Fight", emoji: "🤝", title: "Let's Start Again", message: "I'd rather be on your side than be right. Can we talk, hug, and begin again?" },
  { id: "proud", name: "I'm Proud of You", emoji: "🌟", title: "I'm So Proud of You", message: "Watching you grow and keep going inspires me. Whatever happens, I'm proud of you." },
  { id: "goodmorning", name: "Good Morning / Good Night", emoji: "☀️", title: "Good Morning, Love", message: "Wishing you a gentle day. Remember someone is smiling because of you." },
  { id: "valentine", name: "Valentine's Day", emoji: "🌹", title: "Be My Valentine", message: "Roses are red, but my heart is yours. Will you be my Valentine?", reveal: "🌹 A rose for you." },
  { id: "newyear", name: "New Year / Special Date", emoji: "🎆", title: "Here's to Us", message: "New year, same favorite person. Let's make this one unforgettable.", reveal: "🥂 Cheers to us!" },
  { id: "friendlove", name: "Friendship to Love", emoji: "🌻", title: "Something More?", message: "You've been my best friend, and somewhere along the way you became my everything." },
  { id: "thanks", name: "Thank You for Being You", emoji: "🙏", title: "Thank You", message: "Thank you for your patience, your laughter, and for simply being you." },
  { id: "custom", name: "Custom Blank", emoji: "✨", title: "", message: "" },
];
export const STYLES: [string, string][] = [["glass","🫧"],["envelope","✉️"],["polaroid","📸"],["vintage","📜"],["neon","🌃"],["starry","✨"],["floral","🌸"],["minimal","🤍"]];
