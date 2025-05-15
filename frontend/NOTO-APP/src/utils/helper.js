export let validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export let getInitials = (name) => {
  if (!name || typeof name !== "string") return "";

  let words = name.trim().split(" ").filter(Boolean); // remove empty strings
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0]?.toUpperCase() || "";
  }
  console.log(initials);

  return initials.toUpperCase();
};
