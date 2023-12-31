document.addEventListener('DOMContentLoaded', function () {

    const togglerClass = 'toggler';
    const acc = document.getElementsByClassName(togglerClass);
    let i, j;

    // Add onclick listener to every accordion element
    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function() {

            // For toggling purposes detect if the clicked section is already "active"
            let isActive = this.classList.contains("active");

            // Close all accordions
            let allAccordions = document.getElementsByClassName(togglerClass);

            for (j = 0; j < allAccordions.length; j++) {
                // Remove active class from section header
                allAccordions[j].classList.remove("active");

                // Remove the max-height class from the panel to close it
                let panel = allAccordions[j].nextElementSibling;
                let maxHeightValue = getStyle(panel, "maxHeight");

                if (maxHeightValue !== "0px") {
                    panel.style.maxHeight = null;
                }
            }

            // Toggle the clicked section using a ternary operator
            isActive ? this.classList.remove("active") : this.classList.add("active");

            // Toggle the panel element
            let panel = this.nextElementSibling;

            let maxHeightValue = getStyle(panel, "maxHeight");
            if (maxHeightValue !== "0px") {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        };
    }

    // Cross-browser way to get the computed height of a certain element. Credit to @CMS on StackOverflow (http://stackoverflow.com/a/2531934/7926565)
    function getStyle(el, styleProp) {
        let value, defaultView = (el.ownerDocument || document).defaultView;
        // W3C standard way:
        if (defaultView && defaultView.getComputedStyle) {
            // sanitize property name to css notation
            // (hypen separated words eg. font-Size)
            styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
            return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
        } else if (el.currentStyle) { // IE
            // sanitize property name to camelCase
            styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
                return letter.toUpperCase();
            });
            value = el.currentStyle[styleProp];
            // convert other units to pixels on IE
            if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
                return (function(value) {
                    let oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
                    el.runtimeStyle.left = el.currentStyle.left;
                    el.style.left = value || 0;
                    value = el.style.pixelLeft + "px";
                    el.style.left = oldLeft;
                    el.runtimeStyle.left = oldRsLeft;
                    return value;
                })(value);
            }
            return value;
        }
    }

});