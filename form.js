var timer = null;
var squareX;
var squareY;
var squareHeight;
var squareWidth;

function getRandomColor(){
    var letters = "0123456789abcdef";
    var result = "#";

    for(var i = 0; i < 6; i++){
        result += letters.charAt(parseInt(Math.random() * letters.length));
    }

    return result;

}



$(document).ready(function(){

    setSquares();



    function setSquares(){
        var squareContainer = $("#displayArea");

        for(var i = 0; i < 50; i++){
            var square = $("<div>");

            square.css("height", "50px")
            .css("width", "50px")
            .css("border", "2px")
            .css("borderStyle", "solid")
            .css("borderColor", "black")
            .css("backgroundColor", getRandomColor())
            .css("position", "absolute")
            .css("top", Math.random() * 448 + 'px')
            .css("left", Math.random() * 548 + 'px')
            .data("x", (Math.random() * 5) + 1)
            .data("y", (Math.random() * 5) + 1);
            square.dblclick(function(){
                $(this).remove();
            });
            square.click(function(){
                $(this).siblings().css("zIndex", 0);

                $(this).css("zIndex", 10);

            });

            squareContainer.append(square);
        }

    }

    $("#addSquare").click(function(){
        var squareContainer = $("#displayArea");
        var square = $("<div>");

        square.css("height", "50px")
        .css("width", "50px")
        .css("border", "2px")
        .css("borderStyle", "solid")
        .css("borderColor", "black")
        .css("backgroundColor", getRandomColor())
        .css("position", "absolute")
        .css("top", Math.random() * 448 + 'px')
        .css("left", Math.random() * 548 + 'px')
        .data("x", (Math.random() * 5) + 1)
        .data("y", (Math.random() * 5) + 1);

        square.dblclick(function(){
            $(this).remove();
        });
        square.click(function(){
                $(this).siblings().css("zIndex", 0);

                $(this).css("zIndex", 10);

            });

        squareContainer.append(square);
    
    });

    $("#resetSquares").click(function(){
        $("#displayArea").empty();

        setSquares();

    });

    $("#changeColors").click(function(){
        squareContainer = $("#displayArea");
        allSquares = squareContainer.children();

        allSquares.each(function(idx, e){
            e = $(e);
            e.css("backgroundColor", getRandomColor());
        });
    });

    $("#startAnimation").click(function(){
        if(!timer){
            timer = setInterval(animate,20);
        }
    });

    $("#stopAnimation").click(function(){
        if(timer){
            clearInterval(timer);
            timer = null;
        }
    });

    function animate(){
        squareContainer = $("#displayArea");
        allSquares = squareContainer.children();

        allSquares.each(function(idx, e){
            e = $(e);
            var offset = e.position();

            squareX = offset.left;
            squareY = offset.top;
            squareHeight = e.height();
            squareWidth = e.width();
            
            squareX += e.data("x");
            squareY += e.data("y");

            e.css("left", squareX + "px").css("top", squareY + "px");

            if((e.data("x") > 0 && squareX + e.data("x") + squareWidth > squareContainer.width()) || (e.data("x") < 0 && squareX + e.data("x") < 0)){
                e.data("x", e.data("x")*-1);
                e.css("backgroundColor", getRandomColor())
                .css("borderColor", getRandomColor());
            }
            if((e.data("y") > 0 && squareY + e.data("y") + squareHeight > squareContainer.height()) || (e.data("y") < 0 && squareY + e.data("y") < 0)){
                e.data("y", e.data("y")*-1);
                e.css("backgroundColor", getRandomColor())
                .css("borderColor", getRandomColor());
            }
        });
    }
});