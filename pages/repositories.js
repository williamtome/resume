import React from "react"
import getUser from "../utils/getUser"

const Index = ({ currentDate, repos, user }) => {
  return (
    <div className='container mx-auto'>
      <h1 className='text-5xl'>Meus Repositórios</h1>
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
  const {repos, user} = await getUser('williamtome')
  return {
    props: {
      currentDate: new Date().toString(),
      repos,
      user
    },
  };
}

export default Index;
