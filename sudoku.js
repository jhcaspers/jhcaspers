/**
 *  Mini Sudoku game
 * Copyright 2020 Jan-Hendrik Caspers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * */
function tdClicked() {
    $(".tdSelected").removeClass("tdSelected");
    if (!$(this).hasClass("tdFirst")) {
        $(this).addClass("tdSelected");
    }
}

$(function() {
    let content = '';
    content += "<table>";
    for(let ym=0;ym<3;ym++) {
        content += "<tr>";
        for(let xm=0;xm<3;xm++) {
            content += "<td>";
            content += "<table>";
            for(let y=0;y<3;y++) {
                content += "<tr>";
                for(let x=0;x<3;x++) {
                    let val = '';
                    if (x==1 && y==2 && xm==1 && ym==2) {
                        val = Math.floor(Math.random() * 10);
                    }
                    if (x==1 && y==0 && xm==0 && ym==1) {
                        val = Math.floor(Math.random() * 10);
                    }
                    if (x==2 && y==1 && xm==2 && ym==2) {
                        val = Math.floor(Math.random() * 10);
                    }
                    if (x==0 && y==1 && xm==2 && ym==0) {
                        val = Math.floor(Math.random() * 10);
                    }                    content += '<td class="squareid'+(ym+xm*3)+' row'+(ym*3+y)+' col'+(xm*3+x);
                    if (val=='') {
                            content += ' digit">';
                    } else {
                        content += ' digit tdFirst">';
                        content += val;
                    }
                    content += "</td>";
                }
                content += "</tr>";
            }
            content += "</table>";
            content += "</td>";
        }
        content += "</tr>";
    }
    content += "</table>";
    $(".pagewrapper").append(content);

    $("td.digit").click(tdClicked);
    $(document).keypress(function( event) {
        if (event.key >= 1 && event.key <= 9) {
            let classList = $('.tdSelected').attr('class').split(/\s+/);
            let isValid = true;
            $.each(classList, function(index, item) {
                if ((item.substring(0,3) == 'row') || (item.substring(0,3) == 'col') || (item.substring(0,3) == 'squ')) {
                    if ($('.'+item+':contains("'+event.key+'")').length > 0) isValid=false;
                }
            });
            if (isValid) {
                $(".tdSelected").html(event.key);
                if ($('.digit:empty').length == 0) {
                    $(".pagewrapper").addClass("victory");
                    $(".floating-text").show();
                }
            }
        }
        if (event.key == 0) {
            $(".tdSelected").html('');
        }
    });
});