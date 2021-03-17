import React from "react";

const Index = (props) => {
  return (
    <div>
      <h1>Hello world</h1>
      <div>
        <h3>{props.currentDate}</h3>
      </div>
      {/* <pre>{JSON.stringify(props.repos, null, 2)}</pre> */}
      <div>
        {props.repos.map(repo => {
          return (
            <div key={repo.id}>
              <h3>{repo.full_name}</h3>
              <p>Language: {repo.language} - Stars: {repo.stargazers_count}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
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
      repos
    },
  };
}

export default Index;
