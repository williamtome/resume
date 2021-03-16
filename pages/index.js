import React from "react";

const Index = (props) => {
  return (
    <div>
      <h1>Hello world</h1>
      <div>
        <h3>{props.currentDate}</h3>
      </div>
      <div>
        {props.repos.map(repo => {
          return (
            <div>
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
  const repos = await resRepos.json()
  return {
    props: {
      currentDate: new Date().toString(),
      repos
    },
  };
}

export default Index;
