// List 
let box_list = [document.getElementById("drawbox"), document.getElementById("layerbox"), document.getElementById("textbox"), document.getElementById("textcosbox"), document.getElementById("optioncos"), document.getElementById("shapesbox"), document.getElementById("gridentshapebox"), document.getElementById("gridentcirclebox"), document.getElementById("normalrectbox"), document.getElementById("linebox"), , document.getElementById("erasebox"), document.getElementById("stickerbox"), document.getElementById("filterbox")];
box_list.forEach(box => {
    box.style.display = "none";
})

let btn_list = [document.getElementById("drawdiv"), document.getElementById("layerdiv"), document.getElementById("textcos"), document.getElementById("shapesdiv"), document.getElementById("linediv"), document.getElementById("erasediv"), document.getElementById("sticker"), document.getElementById("filterdiv")]
let clickpro = btnname => {
    btn_list.forEach(btn => {
        if (btn != btnname) {
            btn.click();
        }
    })
}

function leave() {
    return "Write something clever here...";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

draw = false;

const size = $("#size").get(0);
const nameimg = $("#nameimg").get(0);
const downloadbtn = $("#downloadbtn").get(0);
const zoompara = $("#zoompara span").get(0);
const zoomin = $("#zoomin").get(0);
const zoomout = document.getElementById("zoomout");


let scale = 1;
const canvas = $("#canvas").get(0)
const ctx = canvas.getContext("2d");
zoomout.addEventListener("click", () => {
    if (fileuploaded == true) {
        if (scale > 0.5) {
            scale -= 0.5;
            zoompara.innerHTML = scale;
            document.getElementById("canvasdiv").style.transform = `scale(${scale})`;
        } else {
            document.getElementById("errorpara").innerHTML = "can't zoomout any more";
            document.getElementById("error").style.display = "block";
            sleep(1000).then(() => { document.getElementById("error").style.display = "none"; });

        }
    } else {
        document.getElementById("errorpara").innerHTML = "Please upload something";
        document.getElementById("error").style.display = "block";
        sleep(1000).then(() => { document.getElementById("error").style.display = "none"; });
    }
})
zoomin.addEventListener("click", () => {
    if (fileuploaded == true) {
        scale += 0.5;
        zoompara.innerHTML = scale;
        document.getElementById("canvasdiv").style.transform = `scale(${scale})`;
    } else {
        document.getElementById("errorpara").innerHTML = "Please upload something";
        document.getElementById("error").style.display = "block";
        sleep(1000).then(() => { document.getElementById("error").style.display = "none"; });
    }
})

let layers = [ctx];
let canvases = [canvas]
let current_layer = ctx;
let number = 0;

class layer {
    constructor(canvas) {
        this.canvas = canvas
    }
    createLayer() {
        const layerc = document.createElement("canvas");
        number += 1;
        layerc.setAttribute("id", `layer${number}`);
        canvases.push(layerc);
        layerc.style.zIndex = number;
        layerc.setAttribute("class", "absolute top-0 lg:left-0 md:left-0S canvas");
        const element = this.canvas;
        element.appendChild(layerc);
        layerc.height = document.getElementById("canvas").height;
        layerc.width = document.getElementById("canvas").width;
        layers.push(layerc.getContext("2d"));
    };
    removeItems = (From, to) => {
        let spliced = layers.splice(From, to);
        canvases[From].remove();
        spliced = canvases.splice(From, to);
        return layers;
    };
    currentLayer = (index) => {
        current_layer = layers[index];
    };
    moveLayer = (old_index, zi) => {
        canvases[old_index].style.zIndex = zi;
    }
}

// Getting canvas

let img = $("img").get(0);

// Upload
const uploadbtn = $("#uploadbtn").get(0);
const file = $("#uploadinp").get(0);
uploadbtn.addEventListener("click", () => {
    file.click();
});

let fileuploaded = false;

let main_image = null;

file.addEventListener("change", (e) => {
    let read = new FileReader();

    read.readAsDataURL(file.files[0]);
    read.addEventListener("load", (v) => {
        img.src = read.result;
    })
    pic = read.result;

    // Drawing canvas
    read.addEventListener("load", () => {
        base_image = new Image();
        base_image.src = read.result;
        size.innerHTML = `${base_image.width} X ${base_image.height}`;
        if (base_image.width < 900 && base_image.height < 800) {
            canvas.width = base_image.width / 1.5;
            canvas.height = base_image.height / 1.5;
        } else if (base_image.width < 1370 && base_image.height < 770) {
            canvas.width = base_image.width / 3;
            canvas.height = base_image.height / 3;
        } else if (base_image.width < 1950 && base_image.height < 2000) {
            canvas.width = base_image.width / 3;
            canvas.height = base_image.height / 3;
        } else {
            canvas.width = base_image.width / 6;
            canvas.height = base_image.height / 6;
        }
        canvases.forEach((canvased) => {
            canvased.height = document.getElementById("canvas").height;
            canvased.width = document.getElementById("canvas").width;
        })
        base_image.onload = () => ctx.drawImage(base_image, 0, 0, canvas.width, canvas.height);
        fileuploaded = true;
        document.getElementById('canvasdiv').style.cursor = "grab";
        if (fileuploaded == true) {
            uploadbtn.style.display = "none";
            document.getElementById("canvas").style.backgroundImage = `url("../Assets/background.webp")`;
            main_image = read.result;
            document.getElementById("canvas").style.backgroundSize = `cover`;
        }
    });

    for (let t = 1; t < canvases.length; t++) {
        canvases[t].width = canvas.width;
        canvases[t].height = canvas.height;
    }
});

// Class changing method
let changeclass = (element, old_class, new_class) => {
    element.classList.add(new_class);
    element.classList.remove(old_class);
}

// Making the object visible
let click = (div, box) => {
    div.addEventListener("click", () => {
        if (div == document.getElementById("layerdiv")) {
            draw = true;
        } else {
            draw = false;
        }
        if (box.style.display != "none") {
            box.style.display = "none";
            div.style.color = "#5c5c63";
        } else {
            box.style.display = "block"
            div.style.color = "white";
        }
        let box_list = [document.getElementById("drawbox"), document.getElementById("layerbox"), document.getElementById("textbox"), document.getElementById("textcosbox"), document.getElementById("shapesbox"), document.getElementById("linebox"), document.getElementById("erasebox"), document.getElementById("stickerbox"), document.getElementById("filterbox")];
        let btn_list = [document.getElementById("drawdiv"), document.getElementById("layerdiv"), document.getElementById("textdiv"), document.getElementById("textcos"), document.getElementById("shapesdiv"), document.getElementById("linediv"), document.getElementById("erasediv"), document.getElementById("sticker"), document.getElementById("filterdiv")];
        btn_list.forEach(btn => {
            if (btn != div) {
                box_list[btn_list.indexOf(btn)].style.display = "none";
                btn.style.color = "#5c5c63";
            }
        })
    });
};

click($("#drawdiv").get(0), $("#drawbox").get(0));

// Download
downloadbtn.addEventListener("click", () => {
    if (fileuploaded == true) {
        console.clear();
        canvasdown = document.createElement("canvas");
        ctxdown = canvasdown.getContext("2d");
        canvasdown.height = canvas.height;
        canvasdown.width = canvas.width;

        canvases.forEach(canvas => {
            var image = new Image();
            image.src = canvas.toDataURL();
            image.onload = function() {
                ctxdown.drawImage(image, 0, 0, canvasdown.width, canvasdown.height);
                if (canvases[canvases.length - 1] == canvas) {
                    let link = document.createElement("a");
                    link.download = document.getElementById("nameimg").value;
                    link.href = canvasdown.toDataURL();
                    link.click();
                }
            };
        })
    } else {
        document.getElementById("errorpara").innerHTML = "Please upload something";
        document.getElementById("error").style.display = "block";
        sleep(1000).then(() => { document.getElementById("error").style.display = "none"; });
    }
});

let dragvalue;
document.getElementById("addlayer").style.display == "none";
document.getElementById("drawdiv").addEventListener('click', () => {
    // addlayer
    if (document.getElementById("addlayer").style.display != "none") {
        document.getElementById("addlayer").style.display == "block";
    } else {
        document.getElementById("addlayer").style.display == "block";
    }
})

let move = id => {
    let element = document.getElementById("canvasdiv");
    element.style.position = "absolute";
    element.onmousedown = () => {
        dragvalue = element;
    }
}
document.onmouseup = () => {
    dragvalue = null;
    canvas.style.cursor = "grab";
}
document.onmousemove = (e) => {
    gap = document.getElementById("canvas").offsetLeft;
    x = Math.floor(e.pageX - gap);
    y = Math.floor(e.pageY - document.getElementById("canvas").offsetTop);

    if (dragvalue != null) {
        dragvalue.style.left = x + "px";
        dragvalue.style.top = y + "px";
        canvas.style.cursor = "grabbing";
    }
}

document.ontouchend = () => {
    dragvalue = null;
    canvas.style.cursor = "grab";
}
document.ontouchmove = (e) => {
    gap = document.getElementById("canvas").offsetLeft;
    x = Math.floor(e.touches[0].clientX - gap);
    y = Math.floor(e.touches[0].clientY - document.getElementById("canvas").offsetTop);

    if (dragvalue != null) {
        dragvalue.style.left = x + "px";
        dragvalue.style.top = y + "px";
        canvas.style.cursor = "grabbing";
    }
}

let layerbtn = document.getElementById("layerbtn");
let Layernumber = 0;
let layerparas = [document.getElementById("lpara")]
let lo = new layer(document.getElementById("canvasdiv"));

layerbtn.addEventListener("click", () => {
    if (fileuploaded == true) {
        Layernumber += 1;
        const para = document.createElement("p");
        const node = document.createTextNode(`Layer ${Layernumber}`);
        para.appendChild(node);
        para.setAttribute("class", "para");
        para.setAttribute("id", "layer" + Layernumber);
        const element = document.getElementById("layershown");
        layerparas.push(para);
        element.appendChild(para);
        lo.createLayer();
        current_layer = layers[Layernumber]
    } else {
        document.getElementById("errorpara").innerHTML = "Please upload something";
        document.getElementById("error").style.display = "block";
        sleep(1000).then(() => { document.getElementById("error").style.display = "none"; });
    }

});



document.getElementById("deletelayer").addEventListener("click", () => {
    if (fileuploaded == true) {
        let layernumber = window.prompt("Enter your layer number");
        document.getElementById("layer" + layernumber).remove();
        lo.removeItems(layernumber - 1, layernumber - 1);
        Layernumber -= 1;
    } else {
        document.getElementById("errorpara").innerHTML = "Please upload something";
        document.getElementById("error").style.display = "block";
        sleep(1000).then(() => { document.getElementById("error").style.display = "none"; });
    }

})

document.getElementById("copylayer").addEventListener("click", () => {
    if (fileuploaded == true) {
        let layernumber = window.prompt("Enter your layer number");
        const para = document.createElement("p");
        Layernumber += 1;
        const node = document.createTextNode(`Layer ${layernumber} (Duplicate) {Layer ${Layernumber}}`);
        para.appendChild(node);
        para.setAttribute("class", "para");
        para.setAttribute("id", "layer" + Layernumber);
        const element = document.getElementById("layershown");
        layerparas.push(para);
        element.appendChild(para);
        lo.createLayer();
        base_image = new Image();
        base_image.src = canvases[layernumber].toDataURL();
        base_image.onload = () => layers[layers.length - 1].drawImage(base_image, 0, 0, canvas.width, canvas.height);
    } else {
        document.getElementById("errorpara").innerHTML = "Please upload something";
        document.getElementById("error").style.display = "block";
        sleep(1000).then(() => { document.getElementById("error").style.display = "none"; });
    }
})

document.getElementById("currentlayer").addEventListener("click", () => {
    let cl = prompt("enter the layer number");
    current_layer = layers[cl];
})

document.getElementById("zindexlayerbox").style.display = "none";
document.getElementById("zindexlayer").addEventListener("click", () => {
    if (fileuploaded == true) {
        if (document.getElementById("zindexlayerbox").style.display == "none") {
            document.getElementById("zindexlayerbox").style.zIndex = canvases[canvases.length - 1].style.zIndex;
            document.getElementById("zindexlayerbox").style.display = "block";
        } else {
            document.getElementById("zindexlayerbox").style.display = "none";
        }
    } else {
        document.getElementById("errorpara").innerHTML = "Please upload something";
        document.getElementById("error").style.display = "block";
        sleep(1000).then(() => { document.getElementById("error").style.display = "none"; });
    }
})
document.getElementById("donelayer").addEventListener("click", () => {
    document.getElementById("zindexlayerbox").style.display = "none";
    lo.moveLayer(document.getElementById("lni").value, document.getElementById("zii").value)
})

let pos = {
    x: undefined,
    y: undefined
}
let getpos = (e) => {
    const rect = canvas.getBoundingClientRect();
    pos.x = e.clientX - rect.left;
    pos.y = e.clientY - rect.top;
}


window.addEventListener('contextmenu', e => {
    e.preventDefault();
    document.getElementById("context-menu-layer").style.top = e.offsetY + "px";
    document.getElementById("context-menu-layer").style.left = e.offsetX + "px";
    document.getElementById("context-menu-layer").style.display = "none";
})
window.addEventListener("click", (e) => {
        document.getElementById("context-menu-layer").style.display = "none";
    })
    // document.getElementById("contlay").style.display != "none"



// Click draw
click(document.getElementById("layerdiv"), document.getElementById("layerbox"));

// Color indicator
const colorpicker = new iro.ColorPicker("#colorpicker", {
    width: 180,
    color: "#ffffff"
})

let current_colorn = "#ffffff";

colorpicker.on("color:change", color => {
    document.getElementById("ipn").style.color = color.hexString;
    document.getElementById("ipn").innerHTML = color.hexString;
    current_colorn = color.hexString;
})

let getpixelcolor = (x, y) => {
    let pixelData = ctx.getImageData(x, y, 1, 1);
    let data = pixelData.data;
    let pixelColor = `rgba(${data[0]} , ${data[1]} , ${data[2]} , ${data[3]})`;
    return pixelColor;
}

let blurf = 50;
let thicknessf = 50;

let filterb = false;
let eraseb = false;
let drawb = false;

let bge = false;

for (i = 1; i < 3; i++) {
    Layernumber += 1;
    const para = document.createElement("p");
    const node = document.createTextNode(`Layer ${i}`);
    para.appendChild(node);
    para.setAttribute("class", "para");
    para.setAttribute("id", "layer" + Layernumber);
    const element = document.getElementById("layershown");
    layerparas.push(para);
    element.appendChild(para);
    lo.createLayer();
    current_layer = layers[Layernumber]
}

let filterctx = layers[1];
let drawctx = layers[2];

document.getElementById("donef").addEventListener("click", () => {
    if (fileuploaded == true) {
        // canvases[1].width = document.getElementById("canvas").width
        // canvases[1].height = document.getElementById("canvas").height
        // canvases[2].width = document.getElementById("canvas").width
        // canvases[2].height = document.getElementById("canvas").height
        filterb = true;
        eraseb = false;
        drawb = false;
        bge = false;
        document.getElementById("errorpara").innerHTML = "Hold <b>CTRL</b> key to use this tool.";
        document.getElementById("error").style.display = "block";
        sleep(2000).then(() => { document.getElementById("error").style.display = "none"; });
    } else {
        document.getElementById("errorpara").innerHTML = "Please upload something";
        document.getElementById("error").style.display = "block";
        sleep(1000).then(() => { document.getElementById("error").style.display = "none"; });
    }


})

document.getElementById("donebge").addEventListener("click", () => {
    if (fileuploaded == true) {
        // canvases[1].width = document.getElementById("canvas").width
        // canvases[1].height = document.getElementById("canvas").height
        // canvases[2].width = document.getElementById("canvas").width
        // canvases[2].height = document.getElementById("canvas").height
        filterb = false;
        eraseb = false;
        drawb = false;
        bge = true;
        document.getElementById("errorpara").innerHTML = "Hold <b>CTRL</b> key to erase bg.";
        document.getElementById("error").style.display = "block";
        sleep(2000).then(() => { document.getElementById("error").style.display = "none"; });
    } else {
        document.getElementById("errorpara").innerHTML = "Please upload something";
        document.getElementById("error").style.display = "block";
        sleep(1000).then(() => { document.getElementById("error").style.display = "none"; });
    }


})

document.getElementById("donee").addEventListener("click", () => {

    if (fileuploaded == true) {
        // canvases[1].width = document.getElementById("canvas").width
        // canvases[1].height = document.getElementById("canvas").height
        // canvases[2].width = document.getElementById("canvas").width
        // canvases[2].height = document.getElementById("canvas").height
        filterb = false;
        eraseb = true;
        drawb = false;
        bge = false;
        document.getElementById("errorpara").innerHTML = "Hold <b>CTRL</b> key to use this tool.";
        document.getElementById("error").style.display = "block";
        sleep(2000).then(() => { document.getElementById("error").style.display = "none"; });
    } else {
        document.getElementById("errorpara").innerHTML = "Please upload something";
        document.getElementById("error").style.display = "block";
        sleep(1000).then(() => { document.getElementById("error").style.display = "none"; });
    }

})
document.getElementById("doned").addEventListener("click", () => {
    if (fileuploaded == true) {
        filterb = false;
        // canvases[1].width = document.getElementById("canvas").width
        // canvases[1].height = document.getElementById("canvas").height
        // canvases[2].width = document.getElementById("canvas").width
        // canvases[2].height = document.getElementById("canvas").height
        eraseb = false;
        drawb = true;
        bge = false;
        document.getElementById("errorpara").innerHTML = "Hold <b>CTRL</b> key to use this tool.";
        document.getElementById("error").style.display = "block";
        sleep(2000).then(() => { document.getElementById("error").style.display = "none"; });
    } else {
        document.getElementById("errorpara").innerHTML = "Please upload something";
        document.getElementById("error").style.display = "block";
        sleep(1000).then(() => { document.getElementById("error").style.display = "none"; });
    }

})

undolist = [];
undo = -1

document.getElementById("canvasdiv").addEventListener("mousemove", (e) => {
    if (filterb) {
        if (e.ctrlKey) {
            getpos(e);
            filterctx.beginPath();
            filterctx.filter = `blur(${document.getElementById("blurf").value}px) brightness(${getElement("brightf")}) contrast(${getElement("contrastf")}%) invert(${getElement("invertf")}%) sepia(${getElement("sepiaf")}%) saturate(${getElement("saturationf")}%)`;
            filterctx.fillStyle = getpixelcolor(pos.x, pos.y);
            filterctx.arc(pos.x, pos.y, document.getElementById("thicknessf").value, 0, Math.PI * 2, false);
            filterctx.fill();
        }
    }
    if (eraseb) {
        if (e.ctrlKey) {
            getpos(e);
            filterctx.beginPath();
            filterctx.clearRect(pos.x, pos.y, document.getElementById("thicknesse").value, document.getElementById("thicknesse").value)
            filterctx.fill();
            getpos(e);
            drawctx.beginPath();
            drawctx.clearRect(pos.x, pos.y, document.getElementById("thicknesse").value, document.getElementById("thicknesse").value)
            drawctx.fill();
        }
    }
    if (drawb) {
        if (e.ctrlKey) {
            getpos(e);
            drawctx.beginPath();
            drawctx.filter = `blur(${document.getElementById("blurd").value}px)`;
            drawctx.fillStyle = `rgb(${parseInt(current_colorn[1] + current_colorn[2], 16)} , ${parseInt(current_colorn[3] + current_colorn[4], 16)} , ${parseInt(current_colorn[5] + current_colorn[6], 16)})`;
            drawctx.arc(pos.x, pos.y, document.getElementById("thicknessd").value, 0, Math.PI * 2, false);
            drawctx.fill();
        }
    }
    if (bge) {
        if (e.ctrlKey) {
            undo += 1;
            undolist.push(layers[document.getElementById("lnbge").value].getImageData(0, 0, canvas.width, canvas.height));

            getpos(e);

            layers[document.getElementById("lnbge").value].beginPath();
            // layers[document.getElementById("lnbge").value].clearRect(pos.x, pos.y, document.getElementById("wer").value, document.getElementById("her").value)
            layers[document.getElementById("lnbge").value].save();
            layers[document.getElementById("lnbge").value].globalCompositeOperation = 'destination-out';
            layers[document.getElementById("lnbge").value].beginPath();
            layers[document.getElementById("lnbge").value].arc(pos.x, pos.y, document.getElementById("wer").value, 0, 2 * Math.PI, false);
            layers[document.getElementById("lnbge").value].fill();
            layers[document.getElementById("lnbge").value].restore();
            layers[document.getElementById("lnbge").value].globalCompositeOperation = 'destination-over';
            // layers[document.getElementById("lnbge").value].globalCompositeOperation = "source-over";
        }
    }
})

document.getElementById("canvasdiv").addEventListener("touchmove", (e) => {
    if (filterb) {
        if (draw) {
            const rect = canvas.getBoundingClientRect();
            pos.x = e.touches[0].clientX - rect.left;
            pos.y = e.touches[0].clientY - rect.top;
            filterctx.beginPath();
            filterctx.filter = `blur(${document.getElementById("blurf").value}px) brightness(${getElement("brightf")}) contrast(${getElement("contrastf")}%) invert(${getElement("invertf")}%) sepia(${getElement("sepiaf")}%) saturate(${getElement("saturationf")}%)`;
            filterctx.fillStyle = getpixelcolor(pos.x, pos.y);
            filterctx.arc(pos.x, pos.y, document.getElementById("thicknessf").value, 0, Math.PI * 2, false);
            filterctx.fill();
        }
    }
    if (eraseb) {
        if (draw) {
            const rect = canvas.getBoundingClientRect();
            pos.x = e.touches[0].clientX - rect.left;
            pos.y = e.touches[0].clientY - rect.top;
            filterctx.beginPath();
            filterctx.clearRect(pos.x, pos.y, document.getElementById("thicknesse").value, document.getElementById("thicknesse").value)
            filterctx.fill();
            getpos(e);
            drawctx.beginPath();
            drawctx.clearRect(pos.x, pos.y, document.getElementById("thicknesse").value, document.getElementById("thicknesse").value)
            drawctx.fill();
        }
    }
    if (drawb) {
        if (draw) {
            const rect = canvas.getBoundingClientRect();
            pos.x = e.touches[0].clientX - rect.left;
            pos.y = e.touches[0].clientY - rect.top;
            drawctx.beginPath();
            drawctx.filter = `blur(${document.getElementById("blurd").value}px)`;
            drawctx.fillStyle = `rgb(${parseInt(current_colorn[1] + current_colorn[2], 16)} , ${parseInt(current_colorn[3] + current_colorn[4], 16)} , ${parseInt(current_colorn[5] + current_colorn[6], 16)})`;
            drawctx.arc(pos.x, pos.y, document.getElementById("thicknessd").value, 0, Math.PI * 2, false);
            drawctx.fill();
        }
    }
    if (bge) {
        if (draw) {
            const rect = canvas.getBoundingClientRect();
            pos.x = e.touches[0].clientX - rect.left;
            pos.y = e.touches[0].clientY - rect.top;
            undolist.push(layers[document.getElementById("lnbge").value].getImageData(0, 0, canvas.width, canvas.height));

            layers[document.getElementById("lnbge").value].beginPath();
            // layers[document.getElementById("lnbge").value].clearRect(pos.x, pos.y, document.getElementById("wer").value, document.getElementById("her").value)
            layers[document.getElementById("lnbge").value].save();
            layers[document.getElementById("lnbge").value].globalCompositeOperation = 'destination-out';
            layers[document.getElementById("lnbge").value].beginPath();
            layers[document.getElementById("lnbge").value].arc(pos.x, pos.y, document.getElementById("wer").value, 0, 2 * Math.PI, false);
            layers[document.getElementById("lnbge").value].fill();
            layers[document.getElementById("lnbge").value].restore();
            layers[document.getElementById("lnbge").value].globalCompositeOperation = 'destination-over';
        }
        // layers[document.getElementById("lnbge").value].globalCompositeOperation = "source-over";
    }
})


document.getElementById("colorn").addEventListener("click", () => {
    if (document.getElementById("colorpicker").style.display != "none") {
        document.getElementById("colorpicker").style.display = "none";
    } else {
        document.getElementById("colorpicker").style.display = "block"
    }
});

click(document.getElementById("textdiv"), document.getElementById("textbox"));

let textnumber = 0;
let textlayer = [];
let textcanvases = [];
let textpara = [];
let current_text;
let textlist = [];

let gridcolor = (firstc, secc, ctx) => {
    var grd = ctx.createLinearGradient(0, 0, 200, 0);
    grd.addColorStop(0, firstc);
    grd.addColorStop(1, secc);
}

let paratextnumber;

document.getElementById("donet").addEventListener("click", (e) => {
    Layernumber += 1;
    // let para = document.createElement("p");
    // let node = document.createTextNode(`Layer ${Layernumber}`);
    // para.appendChild(node);
    // para.setAttribute("class", "para");
    // para.setAttribute("id", "layer" + Layernumber);
    // let element = document.getElementById("layershown");
    // layerparas.push(para);
    // element.appendChild(para);
    lo.createLayer();
    current_text = layers[Layernumber];

    para = document.createElement("p");
    node = document.createTextNode(`Layer ${Layernumber}`);
    para.appendChild(node);
    para.setAttribute("class", "para");
    para.setAttribute("id", "layer" + Layernumber);
    element = document.getElementById("layershown");
    layerparas.push(para);
    element.appendChild(para);
    lo.createLayer();

    textlayer.push(layers[Layernumber]);
    textcanvases.push(canvases[Layernumber]);

    para = document.createElement("p");
    node = document.createTextNode(`Text ${textnumber} | Layer ${Layernumber}`);
    para.appendChild(node);
    para.setAttribute("class", "para");
    para.setAttribute("id", "text" + textnumber);
    element = document.getElementById("listcos");
    layerparas.push(para);
    element.appendChild(para);
    lo.createLayer();
    current_text = layers[Layernumber];
    textnumber += 1;
    textpara.push(para);

    document.getElementById("donent").addEventListener("click", () => {
        current_text = textlayer[document.getElementById("textnumber").value];
    })

    para.addEventListener("click", () => {
        document.getElementById("optioncos").style.display = "block";
    })

    current_text.font = "30px mono";
    current_text.textAlign = "center";
    textlist.push(document.getElementById("textinput").value);
    current_text.fillText(document.getElementById("textinput").value, document.getElementById("canvas").width / 2, document.getElementById("canvas").height / 2);

    document.getElementById("textinput2").value = document.getElementById("textinput").value;

    paratextnumber = parseInt(para.innerHTML.slice(4));

    current_layer = layers[Layernumber]
})

click(document.getElementById("textcos"), document.getElementById("textcosbox"));
document.getElementById("backcos").addEventListener("click", () => {
    document.getElementById("optioncos").style.display = "none";
})
const colorpickert = new iro.ColorPicker("#colorpickert", {
    width: 180,
    color: "#ffffff"
})

let bgnone = false;
let bordernone = false;

let current_colort = "#ffffff";

colorpickert.on("color:change", color => {
    document.getElementById("ipt").style.color = color.hexString;
    document.getElementById("ipt").innerHTML = color.hexString;
    current_colorth = color.hexString;
    current_colort = `rgba(${parseInt(current_colorth[1] + current_colorth[2], 16)} , ${parseInt(current_colorth[3] + current_colorth[4], 16)} , ${parseInt(current_colorth[5] + current_colorth[6], 16)} , ${document.getElementById("opacity").value})`
    current_text.clearRect(0, 0, canvas.width, canvas.height);
    current_text.beginPath();
    current_text.font = `${document.getElementById("font-size").value}px ${para.innerHTML}`;
    current_text.fillStyle = current_colort;
    current_text.fillText(document.getElementById("textinput2").value, document.getElementById("x-coordinate").value, document.getElementById("y-coordinate").value);
})

document.getElementById("textinput2").addEventListener("input", () => {
    current_text.beginPath();
    current_text.clearRect(0, 0, canvas.width, canvas.height);
    current_text.beginPath();
    current_text.font = `${document.getElementById("font-size").value}px ${para.innerHTML}`;
    current_text.fillStyle = current_colort;
    current_text.fillText(document.getElementById("textinput2").value, document.getElementById("x-coordinate").value, document.getElementById("y-coordinate").value);
})

document.getElementById("deletetext").addEventListener("click", () => {
    let Textnumber = window.prompt("Enter your text number");
    document.getElementById("text" + Textnumber).remove();
    lo.removeItems(Textnumber - 1, Textnumber - 1);
    textnumber -= 1;
    document.getElementById("optioncos").style.display = "none";
})

document.getElementById("x-coordinate").addEventListener("input", () => {
    current_text.beginPath();
    current_text.clearRect(0, 0, canvas.width, canvas.height);
    current_text.beginPath();
    current_text.font = `${document.getElementById("font-size").value}px ${para.innerHTML}`;
    current_text.fillStyle = current_colort;
    current_text.fillText(document.getElementById("textinput2").value, document.getElementById("x-coordinate").value, document.getElementById("y-coordinate").value);
})
document.getElementById("y-coordinate").addEventListener("input", () => {
    current_text.beginPath();
    current_text.clearRect(0, 0, canvas.width, canvas.height);
    current_text.beginPath();
    current_text.font = `${document.getElementById("font-size").value}px ${para.innerHTML}`;
    current_text.fillStyle = current_colort;
    current_text.fillText(document.getElementById("textinput2").value, document.getElementById("x-coordinate").value, document.getElementById("y-coordinate").value);
})
document.getElementById("font-size").addEventListener("input", () => {
    current_text.beginPath();
    current_text.clearRect(0, 0, canvas.width, canvas.height);
    current_text.beginPath();
    current_text.font = `${document.getElementById("font-size").value}px ${para.innerHTML}`;
    current_text.fillStyle = current_colort;
    current_text.fillText(document.getElementById("textinput2").value, document.getElementById("x-coordinate").value, document.getElementById("y-coordinate").value);
})

document.getElementById("colort").addEventListener("click", () => {
    if (document.getElementById("colorpickert").style.display != "none") {
        document.getElementById("colorpickert").style.display = "none";
    } else {
        document.getElementById("colorpickert").style.display = "block"
    }
});
document.getElementById("colorn").click();
document.getElementById("font-list").display = "none";
document.getElementById("select-font").addEventListener("click", () => {
    if (document.getElementById("font-list").style.display == "none") {
        document.getElementById("font-list").style.display = "block";
    } else {
        document.getElementById("font-list").style.display = "none";
    }
})
document.querySelectorAll("#font-list p").forEach(para => {
    para.addEventListener("click", () => {
        current_text.beginPath();
        current_text.clearRect(0, 0, canvas.width, canvas.height);
        current_text.beginPath();
        current_text.font = `${document.getElementById("font-size").value}px ${para.innerHTML}`;
        current_text.fillStyle = current_colort;
        current_text.fillText(document.getElementById("textinput2").value, document.getElementById("x-coordinate").value, document.getElementById("y-coordinate").value);
    })
});

click(document.getElementById("shapesdiv"), document.getElementById("shapesbox"))

Layernumber += 1;
para = document.createElement("p");
node = document.createTextNode(`Layer ${Layernumber} Gradiant shapes`);
para.appendChild(node);
para.setAttribute("class", "para");
para.setAttribute("id", "layer" + Layernumber);
element = document.getElementById("layershown");
layerparas.push(para);
element.appendChild(para);
lo.createLayer();
GS = layers[3];
canvases[3].width = canvases[0].width;
canvases[3].height = canvases[0].height;

document.getElementById("gridentshapediv").addEventListener("click", () => {
    if (document.getElementById("gridentshapebox").style.display != "none") {
        document.getElementById("gridentshapebox").style.display = "none";
    } else {
        document.getElementById("gridentshapebox").style.display = "block";
    }
});

document.getElementById("firstcolorshape").addEventListener("input", () => {
    GS.beginPath();
    GS.clearRect(0, 0, canvas.width, canvas.height);
    GS.beginPath();
    var grd = GS.createLinearGradient(0, 0, document.getElementById("fwshape").value, document.getElementById("angleshape").value);
    grd.addColorStop(0, document.getElementById("firstcolorshape").value);
    grd.addColorStop(1, document.getElementById("seccolorshape").value);

    GS.fillStyle = grd;
    GS.fillRect(document.getElementById("xshape").value, document.getElementById("yshape").value, document.getElementById("wshape").value, document.getElementById("hshape").value);
})
document.getElementById("seccolorshape").addEventListener("input", () => {
    GS.beginPath();
    GS.clearRect(0, 0, canvas.width, canvas.height);
    GS.beginPath();
    var grd = GS.createLinearGradient(0, 0, document.getElementById("fwshape").value, document.getElementById("angleshape").value);
    grd.addColorStop(0, document.getElementById("firstcolorshape").value);
    grd.addColorStop(1, document.getElementById("seccolorshape").value);

    GS.fillStyle = grd;
    GS.fillRect(document.getElementById("xshape").value, document.getElementById("yshape").value, document.getElementById("wshape").value, document.getElementById("hshape").value);
})
document.getElementById("angleshape").addEventListener("input", () => {
    GS.beginPath();
    GS.clearRect(0, 0, canvas.width, canvas.height);
    GS.beginPath();
    var grd = GS.createLinearGradient(0, 0, document.getElementById("fwshape").value, document.getElementById("angleshape").value);
    grd.addColorStop(0, document.getElementById("firstcolorshape").value);
    grd.addColorStop(1, document.getElementById("seccolorshape").value);

    GS.fillStyle = grd;
    GS.fillRect(document.getElementById("xshape").value, document.getElementById("yshape").value, document.getElementById("wshape").value, document.getElementById("hshape").value);
})
document.getElementById("fwshape").addEventListener("input", () => {
    GS.beginPath();
    GS.clearRect(0, 0, canvas.width, canvas.height);
    GS.beginPath();
    var grd = GS.createLinearGradient(0, 0, document.getElementById("fwshape").value, document.getElementById("angleshape").value);
    grd.addColorStop(0, document.getElementById("firstcolorshape").value);
    grd.addColorStop(1, document.getElementById("seccolorshape").value);

    GS.fillStyle = grd;
    GS.fillRect(document.getElementById("xshape").value, document.getElementById("yshape").value, document.getElementById("wshape").value, document.getElementById("hshape").value);
})
document.getElementById("xshape").addEventListener("input", () => {
    GS.beginPath();
    var grd = GS.createLinearGradient(0, 0, document.getElementById("fwshape").value, document.getElementById("angleshape").value);
    grd.addColorStop(0, document.getElementById("firstcolorshape").value);
    grd.addColorStop(1, document.getElementById("seccolorshape").value);

    GS.beginPath();
    GS.clearRect(0, 0, canvas.width, canvas.height);
    GS.fillStyle = grd;
    GS.fillRect(document.getElementById("xshape").value, document.getElementById("yshape").value, document.getElementById("wshape").value, document.getElementById("hshape").value);
})
document.getElementById("yshape").addEventListener("input", () => {
    GS.beginPath();
    var grd = GS.createLinearGradient(0, 0, document.getElementById("fwshape").value, document.getElementById("angleshape").value);
    grd.addColorStop(0, document.getElementById("firstcolorshape").value);
    grd.addColorStop(1, document.getElementById("seccolorshape").value);
    GS.beginPath();
    GS.clearRect(0, 0, canvas.width, canvas.height);
    GS.fillStyle = grd;
    GS.fillRect(document.getElementById("xshape").value, document.getElementById("yshape").value, document.getElementById("wshape").value, document.getElementById("hshape").value);
})

document.getElementById("hshape").addEventListener("input", () => {
    GS.beginPath();
    var grd = GS.createLinearGradient(0, 0, document.getElementById("fwshape").value, document.getElementById("angleshape").value);
    grd.addColorStop(0, document.getElementById("firstcolorshape").value);
    grd.addColorStop(1, document.getElementById("seccolorshape").value);
    GS.beginPath();
    GS.clearRect(0, 0, canvas.width, canvas.height);
    GS.fillStyle = grd;
    GS.fillRect(document.getElementById("xshape").value, document.getElementById("yshape").value, document.getElementById("wshape").value, document.getElementById("hshape").value);
})
document.getElementById("wshape").addEventListener("input", () => {
    GS.beginPath();
    var grd = GS.createLinearGradient(0, 0, document.getElementById("fwshape").value, document.getElementById("angleshape").value);
    grd.addColorStop(0, document.getElementById("firstcolorshape").value);
    grd.addColorStop(1, document.getElementById("seccolorshape").value);

    GS.beginPath();
    GS.clearRect(0, 0, canvas.width, canvas.height);
    GS.fillStyle = grd;
    GS.fillRect(document.getElementById("xshape").value, document.getElementById("yshape").value, document.getElementById("wshape").value, document.getElementById("hshape").value);
});

document.getElementById("wahfull").addEventListener("click", () => {
    document.getElementById("hshape").value = canvas.height;
    document.getElementById("wshape").value = canvas.width;
})

let str_list = str => {
    return str.split(" ");
}

let click_other = (div, box) => {
    div.addEventListener("click", e => {
        if (box.style.display != "none") {
            box.style.display = "none";
        } else {
            box.style.display = "block";
        }
    })
}

click_other(document.getElementById("gridentcirclediv"), document.getElementById("gridentcirclebox"));
cirlcenumber = 0;

document.getElementById("gridentcirclediv").addEventListener("click", () => {
    if (document.getElementById("gridentcirclebox").style.display == "block") {
        Layernumber += 1;
        const para = document.createElement("p");
        const node = document.createTextNode(`Layer ${Layernumber} | ${"CIRCLE NUMBER"} ${cirlcenumber}`);
        para.appendChild(node);
        para.setAttribute("class", "para");
        para.setAttribute("id", "layer" + Layernumber);
        const element = document.getElementById("layershown");
        layerparas.push(para);
        element.appendChild(para);
        lo.createLayer();
        cirlcenumber += 1;
    }
});

let current_gc = 0;

document.getElementById("layergcircle").addEventListener("input", () => {
    current_gc = layers[document.getElementById("layergcircle").value];
});

document.getElementById("firstcolorcircle").addEventListener("input", () => {
    if (document.getElementById("fscircle").value.toLowerCase() == "fill") {
        current_gc.clearRect(0, 0, canvas.width, canvas.height);
        current_gc.beginPath();
        current_gc.fillStyle = document.getElementById("firstcolorcircle").value;
        current_gc.arc(document.getElementById("xcircle").value, document.getElementById("ycircle").value, document.getElementById("rcircle").value, 0, (Math.PI / 180) * document.getElementById("angcircle").value);
        current_gc.fill();
    }
    if (document.getElementById("fscircle").value.toLowerCase() == "border") {
        current_gc.clearRect(0, 0, canvas.width, canvas.height);
        current_gc.beginPath();
        current_gc.lineWidth = document.getElementById("lwcircle").value;
        current_gc.strokeStyle = document.getElementById("firstcolorcircle").value;
        current_gc.arc(document.getElementById("xcircle").value, document.getElementById("ycircle").value, document.getElementById("rcircle").value, 0, (Math.PI / 180) * document.getElementById("angcircle").value);
        current_gc.stroke();
    }
})
document.getElementById("xcircle").addEventListener("input", () => {
    if (document.getElementById("fscircle").value.toLowerCase() == "fill") {
        current_gc.clearRect(0, 0, canvas.width, canvas.height);
        current_gc.beginPath();
        current_gc.fillStyle = document.getElementById("firstcolorcircle").value;
        current_gc.arc(document.getElementById("xcircle").value, document.getElementById("ycircle").value, document.getElementById("rcircle").value, 0, (Math.PI / 180) * document.getElementById("angcircle").value);
        current_gc.fill();
    }
    if (document.getElementById("fscircle").value.toLowerCase() == "border") {
        current_gc.clearRect(0, 0, canvas.width, canvas.height);
        current_gc.beginPath();
        current_gc.lineWidth = document.getElementById("lwcircle").value;
        current_gc.strokeStyle = document.getElementById("firstcolorcircle").value;
        current_gc.arc(document.getElementById("xcircle").value, document.getElementById("ycircle").value, document.getElementById("rcircle").value, 0, (Math.PI / 180) * document.getElementById("angcircle").value);
        current_gc.stroke();
    }
})
document.getElementById("ycircle").addEventListener("input", () => {
    if (document.getElementById("fscircle").value.toLowerCase() == "fill") {
        current_gc.clearRect(0, 0, canvas.width, canvas.height);
        current_gc.beginPath();
        current_gc.fillStyle = document.getElementById("firstcolorcircle").value;
        current_gc.arc(document.getElementById("xcircle").value, document.getElementById("ycircle").value, document.getElementById("rcircle").value, 0, (Math.PI / 180) * document.getElementById("angcircle").value);
        current_gc.fill();
    }
    if (document.getElementById("fscircle").value.toLowerCase() == "border") {
        current_gc.clearRect(0, 0, canvas.width, canvas.height);
        current_gc.beginPath();
        current_gc.lineWidth = document.getElementById("lwcircle").value;
        current_gc.strokeStyle = document.getElementById("firstcolorcircle").value;
        current_gc.arc(document.getElementById("xcircle").value, document.getElementById("ycircle").value, document.getElementById("rcircle").value, 0, (Math.PI / 180) * document.getElementById("angcircle").value);
        current_gc.stroke();
    }
})
document.getElementById("rcircle").addEventListener("input", () => {
    if (document.getElementById("fscircle").value.toLowerCase() == "fill") {
        current_gc.clearRect(0, 0, canvas.width, canvas.height);
        current_gc.beginPath();
        current_gc.fillStyle = document.getElementById("firstcolorcircle").value;
        current_gc.arc(document.getElementById("xcircle").value, document.getElementById("ycircle").value, document.getElementById("rcircle").value, 0, (Math.PI / 180) * document.getElementById("angcircle").value);
        current_gc.fill();
    }
    if (document.getElementById("fscircle").value.toLowerCase() == "border") {
        current_gc.clearRect(0, 0, canvas.width, canvas.height);
        current_gc.beginPath();
        current_gc.lineWidth = document.getElementById("lwcircle").value;
        current_gc.strokeStyle = document.getElementById("firstcolorcircle").value;
        current_gc.arc(document.getElementById("xcircle").value, document.getElementById("ycircle").value, document.getElementById("rcircle").value, 0, (Math.PI / 180) * document.getElementById("angcircle").value);
        current_gc.stroke();
    }
})

document.getElementById("lwcircle").addEventListener("input", () => {
    if (document.getElementById("fscircle").value.toLowerCase() == "fill") {
        current_gc.clearRect(0, 0, canvas.width, canvas.height);
        current_gc.beginPath();
        current_gc.fillStyle = document.getElementById("firstcolorcircle").value;
        current_gc.arc(document.getElementById("xcircle").value, document.getElementById("ycircle").value, document.getElementById("rcircle").value, 0, (Math.PI / 180) * document.getElementById("angcircle").value);
        current_gc.fill();
    }
    if (document.getElementById("fscircle").value.toLowerCase() == "border") {
        current_gc.clearRect(0, 0, canvas.width, canvas.height);
        current_gc.beginPath();
        current_gc.lineWidth = document.getElementById("lwcircle").value;
        current_gc.strokeStyle = document.getElementById("firstcolorcircle").value;
        current_gc.arc(document.getElementById("xcircle").value, document.getElementById("ycircle").value, document.getElementById("rcircle").value, 0, (Math.PI / 180) * document.getElementById("angcircle").value);
        current_gc.stroke();
    }
})

document.getElementById("angcircle").addEventListener("input", () => {
    if (document.getElementById("fscircle").value.toLowerCase() == "fill") {
        current_gc.clearRect(0, 0, canvas.width, canvas.height);
        current_gc.beginPath();
        current_gc.fillStyle = document.getElementById("firstcolorcircle").value;
        current_gc.arc(document.getElementById("xcircle").value, document.getElementById("ycircle").value, document.getElementById("rcircle").value, 0, (Math.PI / 180) * document.getElementById("angcircle").value);
        current_gc.fill();
    }
    if (document.getElementById("fscircle").value.toLowerCase() == "border") {
        current_gc.clearRect(0, 0, canvas.width, canvas.height);
        current_gc.beginPath();
        current_gc.lineWidth = document.getElementById("lwcircle").value;
        current_gc.strokeStyle = document.getElementById("firstcolorcircle").value;
        current_gc.arc(document.getElementById("xcircle").value, document.getElementById("ycircle").value, document.getElementById("rcircle").value, 0, (Math.PI / 180) * document.getElementById("angcircle").value);
        current_gc.stroke();
    }
})

document.getElementById("fscircle").addEventListener("input", () => {
    if (document.getElementById("fscircle").value.toLowerCase() == "fill") {
        current_gc.clearRect(0, 0, canvas.width, canvas.height);
        current_gc.beginPath();
        current_gc.fillStyle = document.getElementById("firstcolorcircle").value;
        current_gc.arc(document.getElementById("xcircle").value, document.getElementById("ycircle").value, document.getElementById("rcircle").value, 0, (Math.PI / 180) * document.getElementById("angcircle").value);
        current_gc.fill();
    }
    if (document.getElementById("fscircle").value.toLowerCase() == "border") {
        current_gc.clearRect(0, 0, canvas.width, canvas.height);
        current_gc.beginPath();
        current_gc.lineWidth = document.getElementById("lwcircle").value;
        current_gc.strokeStyle = document.getElementById("firstcolorcircle").value;
        current_gc.arc(document.getElementById("xcircle").value, document.getElementById("ycircle").value, document.getElementById("rcircle").value, 0, (Math.PI / 180) * document.getElementById("angcircle").value);
        current_gc.stroke();
    }
})

// Rounded rect
CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
}

const colorpickernr = new iro.ColorPicker("#colorpickernr", {
    width: 140,
    color: "#ffffff"
})

document.getElementById("colorpickernr").style.display = "none";

click_other(document.getElementById("colorindicator"), document.getElementById("colorpickernr"));

let current_colornr = "#ffffff";
let cnro = [];
colorpickernr.on("color:change", color => {
    cnro = [];
    document.getElementById("colorindicator").style.color = color.hexString;
    document.getElementById("colorindicator").innerHTML = color.hexString;
    for (i = 1; i < 6; i += 2) {
        cnro.push(parseInt(color.hexString[i] + color.hexString[i + 1], 16));
    };
    current_colornr = `rgba(${cnro[0]} , ${cnro[1]} , ${cnro[2]} , ${document.getElementById("onr").value})`;
    if (document.getElementById("sfnr").value.toLowerCase() == "fill") {
        ctxnr.clearRect(0, 0, canvas.width, canvas.height);
        ctxnr.beginPath();
        ctxnr.fillStyle = current_colornr;
        // x, y, w, h, r
        ctxnr.fillRect(document.getElementById("xnr").value, document.getElementById("ynr").value, document.getElementById("wnr").value, document.getElementById("hnr").value);
        ctxnr.fill();
    }
    if (document.getElementById("sfnr").value.toLowerCase() == "border") {
        ctxnr.clearRect(0, 0, canvas.width, canvas.height);
        ctxnr.beginPath();
        ctxnr.lineWidth = document.getElementById("lwnr").value;
        ctxnr.strokeStyle = current_colornr;
        // x, y, w, h, r
        ctxnr.strokeRect(document.getElementById("xnr").value, document.getElementById("ynr").value, document.getElementById("wnr").value, document.getElementById("hnr").value);
        ctxnr.stroke();
    }
});

document.getElementById("fullhawrectnr").addEventListener("click", () => {
    document.getElementById("hnr").value = canvas.height;
    document.getElementById("wnr").value = canvas.width;
    current_colornr = `rgba(${cnro[0]} , ${cnro[1]} , ${cnro[2]} , ${document.getElementById("onr").value})`;
    if (document.getElementById("sfnr").value.toLowerCase() == "fill") {
        ctxnr.clearRect(0, 0, canvas.width, canvas.height);
        ctxnr.beginPath();
        ctxnr.fillStyle = current_colornr;
        // x, y, w, h, r
        ctxnr.fillRect(document.getElementById("xnr").value, document.getElementById("ynr").value, document.getElementById("wnr").value, document.getElementById("hnr").value);
        ctxnr.fill();
    }
    if (document.getElementById("sfnr").value.toLowerCase() == "border") {
        ctxnr.clearRect(0, 0, canvas.width, canvas.height);
        ctxnr.beginPath();
        ctxnr.lineWidth = document.getElementById("lwnr").value;
        ctxnr.strokeStyle = current_colornr;
        // x, y, w, h, r
        ctxnr.strokeRect(document.getElementById("xnr").value, document.getElementById("ynr").value, document.getElementById("wnr").value, document.getElementById("hnr").value);
        ctxnr.stroke();
    }
});

let nrnumber = 0;

click_other(document.getElementById("normalrectdiv"), document.getElementById("normalrectbox"))

document.getElementById("normalrectdiv").addEventListener("click", () => {
    if (document.getElementById("normalrectbox").style.display == "block") {
        Layernumber += 1;
        const para = document.createElement("p");
        const node = document.createTextNode(`Layer ${Layernumber} | ${"NORMAL RECT. NUMBER"} ${nrnumber}`);
        para.appendChild(node);
        para.setAttribute("class", "para");
        para.setAttribute("id", "layer" + Layernumber);
        const element = document.getElementById("layershown");
        layerparas.push(para);
        element.appendChild(para);
        lo.createLayer();
        nrnumber += 1;
    }
});

let ctxnr = layers[0];

document.getElementById("lnr").addEventListener("input", () => {
    ctxnr = layers[document.getElementById("lnr").value];
});

let list_of_objects = [document.getElementById("hnr"), document.getElementById("wnr"), document.getElementById("xnr"), document.getElementById("ynr"), document.getElementById("lwnr"), document.getElementById("sfnr"), document.getElementById("onr")];

list_of_objects.forEach(objects => {
    objects.addEventListener("input", () => {
        current_colornr = `rgba(${cnro[0]} , ${cnro[1]} , ${cnro[2]} , ${document.getElementById("onr").value})`;
        if (document.getElementById("sfnr").value.toLowerCase() == "fill") {
            ctxnr.clearRect(0, 0, canvas.width, canvas.height);
            ctxnr.beginPath();
            ctxnr.fillStyle = current_colornr;
            // x, y, w, h, r
            ctxnr.fillRect(document.getElementById("xnr").value, document.getElementById("ynr").value, document.getElementById("wnr").value, document.getElementById("hnr").value);
            ctxnr.fill();
        }
        if (document.getElementById("sfnr").value.toLowerCase() == "border") {
            ctxnr.clearRect(0, 0, canvas.width, canvas.height);
            ctxnr.beginPath();
            ctxnr.lineWidth = document.getElementById("lwnr").value;
            ctxnr.strokeStyle = current_colornr;
            // x, y, w, h, r
            ctxnr.strokeRect(document.getElementById("xnr").value, document.getElementById("ynr").value, document.getElementById("wnr").value, document.getElementById("hnr").value);
            ctxnr.stroke();
        }
    });

});

linenumber = 0;
click(document.getElementById("linediv"), document.getElementById("linebox"));
document.getElementById("all").addEventListener("click", () => {
    Layernumber += 1;
    const para = document.createElement("p");
    const node = document.createTextNode(`Layer ${Layernumber} | ${"LINE NUMBER"} ${linenumber}`);
    para.appendChild(node);
    para.setAttribute("class", "para");
    para.setAttribute("id", "layer" + Layernumber);
    const element = document.getElementById("layershown");
    layerparas.push(para);
    element.appendChild(para);
    lo.createLayer();
    linenumber += 1;
})

arcnumber = 0;
document.getElementById("al").addEventListener("click", () => {
    Layernumber += 1;
    const para = document.createElement("p");
    const node = document.createTextNode(`Layer ${Layernumber} | ${"ARC NUMBER"} ${arcnumber}`);
    para.appendChild(node);
    para.setAttribute("class", "para");
    para.setAttribute("id", "layer" + Layernumber);
    const element = document.getElementById("layershown");
    layerparas.push(para);
    element.appendChild(para);
    lo.createLayer();
    arcnumber += 1;
});

document.getElementById("plistdiv").style.display = "none";
click_other(document.getElementById("plist"), document.getElementById("plistdiv"));

pn = 0;
pnlist = []
document.getElementById("apl").addEventListener("click", () => {
    const para = document.createElement("p");
    const node = document.createTextNode(`Point ${pn}`);
    para.appendChild(node);
    para.setAttribute("class", "my-5 bg-black font-mono text-center py-2 rounded");
    para.setAttribute("id", "layer" + Layernumber);
    const element = document.getElementById("plistdiv");
    pnlist.push([document.getElementById("p0y").value, document.getElementById("p0x").value]);
    element.appendChild(para);
    pn += 1;
});

document.getElementById("p0x").addEventListener("input", () => {
    layers[document.getElementById("ll").value].beginPath();
    layers[document.getElementById("ll").value].clearRect(0, 0, canvas.width, canvas.height);
    layers[document.getElementById("ll").value].beginPath();
    if (document.getElementById("ppnx").value == 0) {
        layers[document.getElementById("ll").value].moveTo(document.getElementById("p0x").value, pnlist[0][0]);
        pnlist[0][1] = document.getElementById("p0x").value;
        for (i = 1; i < pnlist.length; i++) {
            layers[document.getElementById("ll").value].lineTo(pnlist[i][1], pnlist[i][0]);
        }
    } else {
        layers[document.getElementById("ll").value].moveTo(pnlist[0][1], pnlist[0][0]);
        for (i = 1; i < pnlist.length; i++) {
            if (document.getElementById("ppnx").value == i) {
                layers[document.getElementById("ll").value].lineTo(document.getElementById("p0x").value, pnlist[i][0]);
                pnlist[i][1] = document.getElementById("p0x").value;
            }
            layers[document.getElementById("ll").value].lineTo(pnlist[i][1], pnlist[i][0]);
        }
    }
    layers[document.getElementById("ll").value].stroke()

});

document.getElementById("p0y").addEventListener("input", () => {
    layers[document.getElementById("ll").value].beginPath();
    layers[document.getElementById("ll").value].clearRect(0, 0, canvas.width, canvas.height);
    layers[document.getElementById("ll").value].beginPath();
    if (document.getElementById("ppnx").value == 0) {
        layers[document.getElementById("ll").value].moveTo(pnlist[0][1], document.getElementById('p0y').value);
        pnlist[0][0] = document.getElementById("p0y").value;
        for (i = 1; i < pnlist.length; i++) {
            layers[document.getElementById("ll").value].lineTo(pnlist[i][1], pnlist[i][0]);
        }
    } else {
        layers[document.getElementById("ll").value].moveTo(pnlist[0][1], pnlist[0][0]);
        for (i = 1; i < pnlist.length; i++) {
            if (document.getElementById("ppnx").value == i) {
                layers[document.getElementById("ll").value].lineTo(pnlist[i][1], document.getElementById("p0y").value);
                pnlist[i][0] = document.getElementById("p0y").value;
            }
            layers[document.getElementById("ll").value].lineTo(pnlist[i][1], pnlist[i][0]);
        }
    }
    layers[document.getElementById("ll").value].stroke()

});

document.getElementById("cl").addEventListener("input", () => {
    layers[document.getElementById("ll").value].beginPath();
    layers[document.getElementById("ll").value].clearRect(0, 0, canvas.width, canvas.height);
    layers[document.getElementById("ll").value].beginPath();
    if ((document.getElementById("fsl").value).toLowerCase() == "fill") {
        layers[document.getElementById("ll").value].fillStyle = document.getElementById("cl").value;
    } else if ((document.getElementById("fsl").value).toLowerCase() == "border") {
        layers[document.getElementById("ll").value].strokeStyle = document.getElementById("cl").value;
        layers[document.getElementById("ll").value].lineWidth = document.getElementById("lwl").value;
    }
    layers[document.getElementById("ll").value].moveTo(pnlist[0][1], pnlist[0][0]);
    for (i = 1; i < pnlist.length; i++) {
        layers[document.getElementById("ll").value].lineTo(pnlist[i][1], pnlist[i][0]);
    }
    if ((document.getElementById("fsl").value).toLowerCase() == "fill") {
        layers[document.getElementById("ll").value].fill();
    } else if ((document.getElementById("fsl").value).toLowerCase() == "border") {
        layers[document.getElementById("ll").value].stroke();
    }
})

document.getElementById("lwl").addEventListener("input", () => {
    layers[document.getElementById("ll").value].beginPath();
    layers[document.getElementById("ll").value].clearRect(0, 0, canvas.width, canvas.height);
    layers[document.getElementById("ll").value].beginPath();
    if ((document.getElementById("fsl").value).toLowerCase() == "fill") {
        layers[document.getElementById("ll").value].fillStyle = document.getElementById("cl").value;
    } else if ((document.getElementById("fsl").value).toLowerCase() == "border") {
        layers[document.getElementById("ll").value].strokeStyle = document.getElementById("cl").value;
        layers[document.getElementById("ll").value].lineWidth = document.getElementById("lwl").value;
    }
    layers[document.getElementById("ll").value].moveTo(pnlist[0][1], pnlist[0][0]);
    for (i = 1; i < pnlist.length; i++) {
        layers[document.getElementById("ll").value].lineTo(pnlist[i][1], pnlist[i][0]);
    }
    if ((document.getElementById("fsl").value).toLowerCase() == "fill") {
        layers[document.getElementById("ll").value].fill();
    } else if ((document.getElementById("fsl").value).toLowerCase() == "border") {
        layers[document.getElementById("ll").value].stroke();
    }
})

document.getElementById("fsl").addEventListener("input", () => {
    layers[document.getElementById("ll").value].beginPath();
    layers[document.getElementById("ll").value].clearRect(0, 0, canvas.width, canvas.height);
    layers[document.getElementById("ll").value].beginPath();
    if ((document.getElementById("fsl").value).toLowerCase() == "fill") {
        layers[document.getElementById("ll").value].fillStyle = document.getElementById("cl").value;
    } else if ((document.getElementById("fsl").value).toLowerCase() == "border") {
        layers[document.getElementById("ll").value].strokeStyle = document.getElementById("cl").value;
        layers[document.getElementById("ll").value].lineWidth = document.getElementById("lwl").value;
    }
    layers[document.getElementById("ll").value].moveTo(pnlist[0][1], pnlist[0][0]);
    for (i = 1; i < pnlist.length; i++) {
        layers[document.getElementById("ll").value].lineTo(pnlist[i][1], pnlist[i][0]);
    }
    if ((document.getElementById("fsl").value).toLowerCase() == "fill") {
        layers[document.getElementById("ll").value].fill();
    } else if ((document.getElementById("fsl").value).toLowerCase() == "border") {
        layers[document.getElementById("ll").value].stroke();
    }
})

pnlista = [];
pna = 0;
document.getElementById("aa").addEventListener("click", () => {
    const para = document.createElement("p");
    const node = document.createTextNode(`Point ${pna}`);
    para.appendChild(node);
    para.setAttribute("class", "my-5 bg-black font-mono text-center py-2 rounded");
    para.setAttribute("id", "layer" + Layernumber);
    const element = document.getElementById("plistdiva");
    pnlista.push([document.getElementById("p0y").value, document.getElementById("p0y").value]);
    element.appendChild(para);
    pna += 1;
});

let arcdraw = (x1, y1, x2, y2, x3, y3, c, r, lw = 0) => {
    layers[document.getElementById("lla").value].beginPath();
    layers[document.getElementById("lla").value].clearRect(0, 0, canvas.width, canvas.height);
    layers[document.getElementById("lla").value].beginPath();
    if ((document.getElementById("fsn").value).toLowerCase() == "fill") {
        layers[document.getElementById("lla").value].fillStyle = c;
    } else if ((document.getElementById("fsn").value).toLowerCase() == "border") {
        layers[document.getElementById("lla").value].strokeStyle = c;
        layers[document.getElementById("lla").value].lineWidth = lw;
    }
    layers[document.getElementById("lla").value].moveTo(x1, y1);
    for (i = 1; i < pnlista.length; i++) {
        layers[document.getElementById("lla").value].arcTo(x2, y2, x3, y3, r);
    }
    layers[document.getElementById("lla").value].arcTo(x2, y2, x3, y3, r);
    if ((document.getElementById("fsn").value).toLowerCase() == "fill") {
        layers[document.getElementById("lla").value].fill();
    } else if ((document.getElementById("fsn").value).toLowerCase() == "border") {
        layers[document.getElementById("lla").value].stroke();
    }
}

document.getElementById("arauto").addEventListener("click", () => {
    document.getElementById("pa0y2").value = document.getElementById("pa0y").value;
    document.getElementById("pa0rx").value = parseInt(document.getElementById("pa0x").value) + parseInt(document.getElementById("ra").value);
    arcdraw(document.getElementById("pa0x").value, document.getElementById("pa0y").value, document.getElementById("pa0rx").value, document.getElementById("pa0y2").value, document.getElementById("pa0x2").value, document.getElementById("pa0ry").value, document.getElementById("cn").value, document.getElementById("ra").value, document.getElementById("lwn").value);
});

let palist = [document.getElementById("pa0x"), document.getElementById("pa0y"), document.getElementById("pa0rx"), document.getElementById("pa0y2"), document.getElementById("pa0x2"), document.getElementById("pa0ry"), document.getElementById("cn"), document.getElementById("ra"), document.getElementById("lwn"), document.getElementById("fsn")];

palist.forEach(items => {
    items.addEventListener("input", () => {
        arcdraw(document.getElementById("pa0x").value, document.getElementById("pa0y").value, document.getElementById("pa0rx").value, document.getElementById("pa0y2").value, document.getElementById("pa0x2").value, document.getElementById("pa0ry").value, document.getElementById("cn").value, document.getElementById("ra").value, document.getElementById("lwn").value);
    })
})

// undo += 1;
// undolist.push(layers[document.getElementById("lnbge").value].getImageData(0, 0, canvas.width, canvas.height))

document.getElementById("undo").addEventListener("click", () => {
    if (undo < 0) {
        undo = 1;
    }
    layers[document.getElementById("lnbge").value].putImageData(undolist[undo], 0, 0);
    if (undo < 0) {
        undo = 1;
    } else {
        undo -= document.getElementById("per").value;
    }
    undolist.pop();
});

document.getElementById("clearbge").addEventListener("click", () => {
    undo = 0
    layers[document.getElementById("lnbge").value].putImageData(undolist[undo], 0, 0);
    document.getElementById("per").value = 0;
})

document.getElementById("plistdiva").style.display = "none";
click(document.getElementById("erasediv"), document.getElementById("erasebox"))
click_other(document.getElementById("alist"), document.getElementById("plistdiva"));

click(document.getElementById("sticker"), document.getElementById("stickerbox"));

let imgnumber = 0;

let hb = 0;
let wb = 0;

let no_name = [];
let no_namel = [];
let inumber = 0;

let list_info_extra_image = [];

["r_eximg", "y_eximg", "x_eximg", "h_eximg", "w_eximg", "blur_filter", "bright_filter", "contrast_filter", "invert_filter", "sepia_filter", "saturation_filter"].forEach(items => {
    list_info_extra_image.push(document.getElementById(items));
});

document.getElementById("importimg").addEventListener("click", () => {

    document.getElementById("extraimage").click();

    /* Creating a new layer */
    Layernumber += 1;
    const para = document.createElement("p");
    const node = document.createTextNode(`Layer ${Layernumber} | ${"Image"} ${imgnumber}`);
    para.appendChild(node);
    para.setAttribute("class", "para");
    para.setAttribute("id", "layer" + Layernumber);
    const element = document.getElementById("layershown");
    layerparas.push(para);
    element.appendChild(para);
    lo.createLayer();
    imgnumber += 1;

    let file = document.getElementById("extraimage");

    /* drawing image */
    i = null;

    file.addEventListener("change", (e) => {
        let read = new FileReader();

        read.readAsDataURL(file.files[0]);
        read.addEventListener("load", () => {
            base_image = new Image();
            base_image.src = read.result;
            base_image.onload = () => layers[Layernumber].drawImage(base_image, 0, 0, canvases[Layernumber].width, canvases[Layernumber].height);

            list_info_extra_image[2].value = 0;
            list_info_extra_image[1].value = 0;
            list_info_extra_image[3].value = canvases[Layernumber].height;
            list_info_extra_image[4].value = canvases[Layernumber].width;
            document.getElementById("layer_ex_image").value = inumber;

            no_name.push(read.result);
            no_namel.push(layers[Layernumber]);
            inumber += 1;
        });
    })

});

let getElement = element => {
    return document.getElementById(element).value
}



list_info_extra_image.forEach(items => {
    items.addEventListener("input", () => {
        no_namel[document.getElementById("layer_ex_image").value].clearRect(0, 0, canvas.width, canvas.height);
        no_namel[document.getElementById("layer_ex_image").value].beginPath()
        no_namel[document.getElementById("layer_ex_image").value].filter = `blur(${getElement("blur_filter")}px) brightness(${getElement("bright_filter")}) contrast(${getElement("contrast_filter")}%) invert(${getElement("invert_filter")}%) sepia(${getElement("sepia_filter")}%) saturate(${getElement("saturation_filter")}%)`
        base_image = new Image();
        base_image.src = no_name[document.getElementById("layer_ex_image").value];
        console.log(`Width of an image uploaded = ${base_image.width}px`);
        console.log(`Height of an image uploaded = ${base_image.height}px`);
        base_image.onload = () => no_namel[document.getElementById("layer_ex_image").value].drawImage(base_image, list_info_extra_image[2].value, list_info_extra_image[1].value, list_info_extra_image[3].value, list_info_extra_image[4].value);
    });
});

click(document.getElementById("filterdiv"), document.getElementById("filterbox"));

let filtertool = [];

["blur_filter1", "bright_filter1", "contrast_filter1", "saturation_filter1", "invert_filter1", "sepia_filter1"].forEach(items => {
    filtertool.push(document.getElementById(items));
});

filtertool.forEach(tool => {
    tool.addEventListener("input", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.filter = `blur(${getElement("blur_filter1")}px) brightness(${getElement("bright_filter1")}) contrast(${getElement("contrast_filter1")}%) invert(${getElement("invert_filter1")}%) sepia(${getElement("sepia_filter1")}%) saturate(${getElement("saturation_filter1")}%)`
        base_image = new Image();
        base_image.src = main_image;
        console.log(`Width of an image uploaded = ${base_image.width}px`);
        console.log(`Height of an image uploaded = ${base_image.height}px`);
        base_image.onload = () => ctx.drawImage(base_image, 0, 0, canvas.width, canvas.height);
    })
})

let what_is_the_meaning_of_manducare_meum_stercore = "It is the latin word meaning eat my shit!";

// Clearing the console
window.addEventListener("load", () => {
    console.clear();
})
console.warn("Do not write any javascript code if you are new or you don't know javascirpt");
