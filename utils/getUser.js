const getUser = async (githubUsername) => {
  const resUser = await fetch("https://api.github.com/users/" + githubUsername);
  const user = await resUser.json();

  const resRepos = await fetch(
    `https://api.github.com/users/${githubUsername}/repos?sort=updated`
  );
  const originalRepos = await resRepos.json();

  const dontShowRepos = [
    "williamtome/form-validation-laravel",
    "williamtome/laravel-advanced-form-validation",
    "williamtome/happy-api",
    "williamtome/happy",
  ];

  const isNotFork = (repo) => !repo.fork;
  const showRepos = (repo) => dontShowRepos.indexOf(repo.full_name) === -1;
  const extractData = (repo) => ({
    id: repo.id,
    full_name: repo.full_name,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
  });

  const repos = originalRepos
    .filter(isNotFork)
    .filter(showRepos)
    .map(extractData);

  return {
    repos,
    user,
  };
};

export default getUser;
