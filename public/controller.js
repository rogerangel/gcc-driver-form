const url =
  "https://script.google.com/macros/s/AKfycbwEWWQxLLPl4qxowWmuqfN-w4HA_HyR96jQjPbrSjtoA2X7SwYN1gxBt6f1pyYFNH3y/exec";

const Gapp = {
  connect: {
    send: async (object) => {
      try {
        await fetch(url, {
          method: "POST",
          mode: "no-cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          body: JSON.stringify(object),
        });
        return true;
      } catch (err) {
        console.log(err);
      }
    },
    receive: async () => {
      try {
        const init = await fetch(url, {
          method: "GET",
          redirect: "follow",
        });
        const parse = JSON.parse(await init.text());
        return parse[0];
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default Gapp;
