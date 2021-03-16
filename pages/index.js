import React from "react";

const Index = (props) => {
  return (
    <div>
      <h1>Hello world</h1>
      <div>
          <h3>{props.currentDate}</h3>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      currentDate: new Date().toString(),
    },
  };
}

export default Index;
