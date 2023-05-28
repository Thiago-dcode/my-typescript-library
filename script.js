const appDiv = document.getElementById("app");
const url = "https://jsonplaceholder.typicode.com/";

//Create elements

const app = () => {
  const createDomElements = (data, parentElement, attAndTags) => {
    const arrOfAttAndTags = Object.entries(attAndTags);

    let elements = [];
    for (let i = 0; i < data.length; i++) {
      const parent = document.createElement(parentElement);

      arrOfAttAndTags.forEach((childElement) => {
        const [att, tag] = childElement;

        const element = document.createElement(tag);
        element.textContent = data[i][att];
        parent.appendChild(element);
      });
      elements.push({
        ["data"]: data[i],
        ["element"]: parent,
      });
    }
    return elements;
  };

  //Append elements

  const appendElements = (parentArr, childArr, parentId, childId) => {
    let elements = [];
    for (let i = 0; i < parentArr.length; i++) {
      const div = document.createElement("div");
      const { data: parentData, element: parentElement } = parentArr[i];
      childArr.forEach((child) => {
        const { data: childData, element: childElement } = child;

        if (childData[childId] === parentData[parentId]) {
          childElement.style.border = "1px solid black";
          div.appendChild(childElement);
          div.style.border = "1px solid black";
        }
      });
      if (div.hasChildNodes()) {
        const title = document.createElement("h3");
        title.textContent = "Comments:";
        div.insertBefore(title, div.firstChild);
        parentElement.appendChild(div);
      }
      parentElement.style.padding = "1rem";
      parentElement.style.margin = "0.5rem 0";
      parentElement.style.border = "1px solid black";
      elements.push(parentElement);
    }


    return elements;
  };

  //Fetch data
  const fetchData = async (query) => {
    const res = await fetch(url + query);
    const data = await res.json();

    return data;
  };
  const getPosts = async () => {
    const [posts, comments] = await Promise.all([
      fetchData("posts"),
      fetchData("comments"),
    ]);

    const postElements = createDomElements(posts, "article", {
      title: "h1",
      body: "p",
    });
    const commentElements = createDomElements(comments, "div", {
      name: "h3",
      body: "p",
    });
    const postCommentsElements = appendElements(
      postElements,
      commentElements,
      "id",
      "postId"
    );
    printElements("main", postCommentsElements);
  };

  const printElements = (parent, elements) => {
    const main = document.createElement(parent);

    elements.forEach((element) => {
      main.appendChild(element);
    });

    appDiv.appendChild(main);
  };

  getPosts();
};

app();
