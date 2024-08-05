let htmlPage = "<h2>Pagina dinamica</h2>";
const paginas = {
  ventas: "../views/ventas/ventas-temp.html",
  dashboard: "../views/dashboard/dashboard-temp.html",
};

let pagina = "ventas";

function setInnerHTML(elm, html) {
  elm.innerHTML = html;

  Array.from(elm.querySelectorAll("script")).forEach((oldScriptEl) => {
    const newScriptEl = document.createElement("script");

    Array.from(oldScriptEl.attributes).forEach((attr) => {
      // if(attr.name === "id" && attr.value === "mount") return;
      newScriptEl.setAttribute(attr.name, attr.value);
    });

    const scriptText = document.createTextNode(oldScriptEl.innerHTML);
    newScriptEl.appendChild(scriptText);

    oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
  });
}

function contentLoader() {
  return {
    isSidebarOpen: true,
    content: "",

    loadContent(page) {
      console.log("getting page....");
      // load destroy method
      let unmountCallback = () => {};
      if (pagina === "dashboard")
        unmountCallback = onUnmountDashboard;
      // else if(page === "ventas ") unmountCallback = onUnmountVentas;


      pagina = page;
      const url = paginas[pagina];
      if (!url) {
        // devolver pagina not found
        console.log(`Page not found "${page}"`);
      }
      let callback = () => {};
      // load callback
      if (page === "dashboard") callback = onLoadDashboard;
      // else if (page === "ventas") callback = onLoadVentas;
      
      fetch(url)
        .then((response) => response.text())
        .then((html) => {
          // execute unmounted method
          unmountCallback();

          // Replace html content
          const mainDocument = document.querySelector("#dynamicContent");
          const voidMain = document.createElement("main");
          voidMain.setAttribute("id", "dynamicContent");
          voidMain.classList.add(
            "flex-1",
            "max-h-full",
            "p-3",
            "overflow-hidden",
            "overflow-y-scroll",
            "w-full",
            "bg-zinc-50"
          );
          mainDocument.replaceWith(voidMain);
          // Cargar todos los childs de newMainElement a voidMain
          // voidMain.append(...newMainElement.children);
          setInnerHTML(voidMain, html);
          // console.log(newMainElement);
        })
        .catch((error) => {
          console.error("Error loading content:", error);
        })
        .finally(() => {
          callback();
        });
    },
  };
}

// llamar para cargar la pagina por defecto
const contentLoaderFunction = contentLoader();

contentLoaderFunction.loadContent(pagina);
