const t={startButton:document.querySelector("[data-start]"),stopButton:document.querySelector("[data-stop]"),bodyEl:document.querySelector("body")};let e=null;t.startButton.addEventListener("click",(function(){t.startButton.setAttribute("disabled",!0),e=setInterval((()=>{t.bodyEl.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),t.stopButton.addEventListener("click",(function(){clearInterval(e),t.startButton.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.cf1b110d.js.map