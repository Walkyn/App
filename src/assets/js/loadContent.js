let htmlPage = "<h2>Pagina dinamica</h2>";
const paginas = {
  ventas: "../views/ventas/ventas.html",
  dashboard: "../views/dashboard/dashboard.html",
  clientes: "../views/clientes/clientes.html",
  productos: "../views/productos/registrarProductos.html",
};

let pagina = "dashboard";

let currentPage = {
  onMountCallback: () => {},
  onUnmountCallback: () => {},
};

function setInnerHTML(html) {
  if (currentPage) {
    currentPage.onUnmountCallback();
  }

  const mainDocument = document.querySelector("#dynamicContent");
  const elm = document.createElement("main");
  elm.setAttribute("id", "dynamicContent");
  elm.classList.add(
    "flex-1",
    "max-h-full",
    "p-3",
    "overflow-hidden",
    "overflow-y-scroll",
    "w-full",
    "bg-zinc-50",
    "scrollbar"
  );
  mainDocument.replaceWith(elm);

  // elm.innerHTML = html;

  const virtualDom = document.createElement("div");
  virtualDom.innerHTML = html;

  // unmountScript

  // iterate all childrens of virtualDom
  const childrenToAppend = [];
  for (let i = 0; i < virtualDom.children.length; i++) {
    const child = virtualDom.children[i];
    // filter childs that are scripts
    if (child.tagName === "SCRIPT" && child.id === "mount") {
      // console.log("mount scrypt:", child.text);
      currentPage.onMountCallback = function () {
        "use strict";
        eval?.(child.text);
      };
    } else if (child.tagName === "SCRIPT" && child.id === "unmount") {
      // console.log("unmount scrypt:", child.text);
      currentPage.onUnmountCallback = function () {
        "use strict";
        eval?.(child.text);
      };
    } else {
      childrenToAppend.push(child);
    }
  }
  elm.append(...childrenToAppend);
  // virtualDom.children().forEach((child) => {
  //   // filter childs that are scripts
  //   if (child.tagName === "SCRIPT" && child.id === "mount") {
  //     onMountCallback = () => eval(oldScriptEl.text);
  //   } else if( child.tagName === "SCRIPT" && child.id === "unmount") {
  //     onUnmountCallback = () => eval(oldScriptEl.text);
  //   } else {
  //     elm.appendChild(child);
  //   }
  // });
  currentPage = {
    element: elm,
    onUnmountCallback: currentPage.onUnmountCallback,
    onMountCallback: currentPage.onMountCallback,
  };

  currentPage.onMountCallback()

  // Array.from(elm.querySelectorAll("script")).forEach((oldScriptEl) => {
  //   const newScriptEl = document.createElement("script");

  //   Array.from(oldScriptEl.attributes).forEach((attr) => {
  //      if(attr.name === "id" && attr.value === "onMount") {
  //       onMountCallback = () => eval(oldScriptEl.text);
  //      }
  //      if(attr.name === "id" && attr.value === "unMount") {
  //       onUnmountCallback = () => eval(oldScriptEl.text);
  //      }
  //     newScriptEl.setAttribute(attr.name, attr.value);
  //   });

  //   const scriptText = document.createTextNode(oldScriptEl.innerHTML);
  //   newScriptEl.appendChild(scriptText);

  //   oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
  // });
}

function contentLoader() {
  return {
    isSidebarOpen: true,
    content: "",

    loadContent(page) {
      console.log("getting page....");
      // Mostrar el spinner
      document.getElementById("spinner").classList.remove("hidden");

      pagina = page;
      const url = paginas[pagina];
      if (!url) {
        // devolver pagina not found
        console.log(`Page not found "${page}"`);
      }

      fetch(url)
        .then((response) => response.text())
        .then((html) => {
          // Replace html content

          // onUnmountCallback();
          setInnerHTML(html);
          // ejecutar on mount
          // onMountCallback();
        })
        .catch((error) => {
          console.error("Error loading content:", error);
        })
        .finally(() => {
          // Ocultar el spinner después
          setTimeout(() => {
            if (spinner) {
              spinner.classList.add("hidden");
            }
          }, 700);
        });
    },
  };
}

// llamar para cargar la pagina por defecto
const contentLoaderFunction = contentLoader();

contentLoaderFunction.loadContent(pagina);
