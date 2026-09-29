(function(){
  function groupedBarChart(svgId, tipId, opts){
    var svg = document.getElementById(svgId);
    var tip = document.getElementById(tipId);
    var vb = svg.viewBox.baseVal;
    var W = vb.width, H = vb.height;
    var marginL = 34, marginR = 10, marginT = 14, marginB = 30;
    var plotW = W - marginL - marginR, plotH = H - marginT - marginB;
    var cats = opts.categories, s1 = opts.series1, s2 = opts.series2;
    var allVals = s1.concat(s2);
    var maxV = Math.max.apply(null, allVals.concat([0]));
    var minV = Math.min.apply(null, allVals.concat([0]));
    var niceMax = Math.ceil(maxV / 2) * 2 + 2;
    var niceMin = minV < 0 ? Math.floor(minV / 2) * 2 - 2 : 0;
    var range = niceMax - niceMin;
    function y(v){ return marginT + plotH - ((v - niceMin) / range) * plotH; }
    var zeroY = y(0);

    var ns = 'http://www.w3.org/2000/svg';
    function el(tag, attrs){
      var e = document.createElementNS(ns, tag);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    }
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    var steps = 4;
    for (var i=0;i<=steps;i++){
      var v = niceMin + (range/steps)*i;
      var gy = y(v);
      svg.appendChild(el('line',{x1:marginL,x2:W-marginR,y1:gy,y2:gy,class:'grid-line'}));
      var t = el('text',{x:marginL-6,y:gy+3,class:'axis-label','text-anchor':'end'});
      t.textContent = (v>0?'+':'') + v + '%';
      svg.appendChild(t);
    }
    svg.appendChild(el('line',{x1:marginL,x2:W-marginR,y1:zeroY,y2:zeroY,class:'baseline'}));

    var groupW = plotW / cats.length;
    var barW = Math.min(26, groupW * 0.30);
    var gap = 3;

    cats.forEach(function(cat, i){
      var gx = marginL + groupW * i + groupW/2;
      [ {v:s1[i], color:'var(--series-1)', dx:-(barW+gap)/2}, {v:s2[i], color:'var(--series-2)', dx:(barW+gap)/2} ]
        .forEach(function(bar){
          var by = Math.min(y(bar.v), zeroY);
          var bh = Math.abs(y(bar.v) - zeroY);
          var x = gx + bar.dx - barW/2;
          var rect = el('rect',{
            x:x, y:by, width:barW, height:Math.max(bh,1),
            rx:4, ry:4, fill:bar.color, class:'bar'
          });
          rect.addEventListener('mousemove', function(e){
            var rectBB = svg.getBoundingClientRect();
            tip.style.left = (e.clientX - rectBB.left) + 'px';
            tip.style.top = (e.clientY - rectBB.top - 8) + 'px';
            tip.style.opacity = 1;
            tip.textContent = cat + ': ' + (bar.v>0?'+':'') + bar.v.toFixed(1) + (opts.suffix||'%');
          });
          rect.addEventListener('mouseleave', function(){ tip.style.opacity = 0; });
          svg.appendChild(rect);

          if (opts.directLabel){
            var lbl = el('text',{x:x+barW/2, y: (bar.v>=0 ? by-4 : by+bh+11), 'text-anchor':'middle', class:'bar-label'});
            lbl.textContent = (bar.v>0?'+':'') + bar.v.toFixed(1);
            svg.appendChild(lbl);
          }
        });
      var catLabel = el('text',{x:gx, y:H-8, 'text-anchor':'middle', class:'axis-label'});
      catLabel.textContent = cat;
      svg.appendChild(catLabel);
    });
  }

  function render(){
    groupedBarChart('chart-returns','tip-returns',{
      categories:['QTD','YTD','1-Yr','3-Yr (ann)','5-Yr (ann)'],
      series1:[7.0, 2.9, 5.1, 4.5, 4.3],
      series2:[4.0, 2.4, 6.1, 10.6, 7.8],
      directLabel:true
    });
    groupedBarChart('chart-vol','tip-vol',{
      categories:['3-Yr stdev','5-Yr stdev'],
      series1:[12.6, 14.0],
      series2:[10.8, 12.4],
      directLabel:true
    });
  }
  render();
  window.addEventListener('resize', render);
})();
