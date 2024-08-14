let htmlPage = "<h2>Pagina dinamica</h2>";
const paginas = {
  ventas: "../views/ventas/ventas.html",
  dashboard: "../views/dashboard/dashboard.html",
  clientes: "../views/clientes/clientes.html",
  productos: "../views/productos/products.html",
  add_stock: "../views/inventario/add-stock.html",
  agotados_stock: "../views/inventario/agotados-stock.html",
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
    "p-2",
    "overflow-hidden",
    "overflow-y-scroll",
    "w-full",
    "bg-white",
    "scrollbar"
  );
  mainDocument.replaceWith(elm);

  // elm.innerHTML = html;

  const virtualDom = document.createElement("div");
  virtualDom.innerHTML = html;

  // unmountScript

  // iterate all childrens of virtualDom
  const childrenToAppend = [];
  currentPage.onMountCallback = () => {};
  currentPage.onUnmountCallback = () => {};
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

  currentPage = {
    element: elm,
    onUnmountCallback: currentPage.onUnmountCallback,
    onMountCallback: currentPage.onMountCallback,
  };

  currentPage.onMountCallback();
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
          setInnerHTML(html);
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
