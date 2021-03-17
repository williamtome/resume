import React from "react"

const Index = ({ currentDate, repos, user }) => {
  return (
    <div className='container mx-auto'>
      <h1 className='text-5xl'>Olá eu sou William Tomé</h1>
      <h2 className="text-3xl font-bold">Meus Repositórios GitHub</h2>
      <p>GitHub Stats: Public Repos: {user.public_repos} / Public Gists: {user.public_gists} / Followers: {user.following}</p>
      <div>
        <h3>{currentDate}</h3>
      </div>
      <div>
        {repos.map(repo => {
          return (
            <div key={repo.id} className='rounded bg-gray-300 mx-4 my-8 p-4 hover:shadow-xl'>
              <h3 className='font-bold'>{repo.full_name}</h3>
              <p>Language: {repo.language} - Stars: {repo.stargazers_count}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const resUser = await fetch('https://api.github.com/users/williamtome')
  const user = await resUser.json()
  
  const resRepos = await fetch('https://api.github.com/users/williamtome/repos?sort=updated')
  const originalRepos = await resRepos.json()

  const dontShowRepos = [
    'williamtome/form-validation-laravel',
    'williamtome/laravel-advanced-form-validation',
    'williamtome/happy-api',
    'williamtome/happy'
  ]

  const isNotFork = repo => !repo.fork
  const showRepos = repo => dontShowRepos.indexOf(repo.full_name) === -1
  const extractData = repo => ({
    id: repo.id,
    full_name: repo.full_name,
    language: repo.language,
    stargazers_count: repo.stargazers_count
  })

  const repos = originalRepos
                  .filter(isNotFork)
                  .filter(showRepos)
                  .map(extractData)
  
  return {
    props: {
      currentDate: new Date().toString(),
      repos,
      user
    },
  };
}

export default Index;
