const username = process.argv[2];
if (!username) {
  console.log("error: please provide a GitHub username");
  process.exit(1);
}
const fetchGithubUser = async () => {
  const userinfo = {};
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      console.log(`error: GitHub user not found: ${username}`);
      process.exit(1);
    }
    const userData = await response.json();
    userinfo.Name = userData.name;
    userinfo.Username = username;
    userinfo.Profile = `https://github.com/${username}`;
    userinfo["Public repos"] = userData.public_repos;
    userinfo.Followers = userData.followers;
  } catch (error) {
    console.log("Something went wrong", error);
    process.exit(1);
  }
  return userinfo;
};
fetchGithubUser().then((data) => {
  console.log(data);
});
