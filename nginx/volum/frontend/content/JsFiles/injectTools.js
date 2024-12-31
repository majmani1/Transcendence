export  function injectScriptElement(
	src,
	type = "text/javascript",
	async = false,
	defer = false
  ) {
	const scriptElement = document.createElement("script");
	scriptElement.src = src;
	scriptElement.className = "dynamic-script"; // Add class to identify dynamic scripts
	// scriptElement.type = type; // Set the script type, e.g., "module"
  
	if (async) {
	  scriptElement.async = true; // Enable async loading
	}
  
	if (defer) {
	  scriptElement.defer = true; // Enable deferred execution
	}
  
	document.head.appendChild(scriptElement);
  }
  
export function injectScriptElement2(src, type, async = false, defer = false) {
	const scriptElement = document.createElement("script");
	scriptElement.src = src;
	scriptElement.className = "dynamic-script"; // Add class to identify dynamic scripts
	// scriptElement.type = type; // Set the script type, e.g., "module"
  
	if (async) {
	  scriptElement.async = true; // Enable async loading
	}
  
	if (defer) {
	  scriptElement.defer = true; // Enable deferred execution
	}
  
	document.body.appendChild(scriptElement);
  }
export function removeScripts() {
	const dynamicScripts = document.querySelectorAll(".dynamic-script");
	dynamicScripts.forEach((script) => {
	  script.parentNode.removeChild(script);
	});
  }
  
export function injectLinkElement(rel, href, integrity, crossorigin) {
	return new Promise((resolve, reject) => {
	  const link = document.createElement("link");
	  link.rel = rel;
	  link.href = href;
	  link.className = "dynamic-link"; // Add class to identify dynamic links
	  if (integrity) link.integrity = integrity;
	  if (crossorigin) link.crossOrigin = crossorigin;
	  link.onload = () => resolve();
	  link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
	  document.head.appendChild(link);
	});
  }
  
 export function removeLinks() {
	const dynamicLinks = document.querySelectorAll(".dynamic-link");
	dynamicLinks.forEach((link) => {
	  link.parentNode.removeChild(link);
	});
  }