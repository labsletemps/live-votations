 d3.xml("map.svg", "image/svg+xml", function(xml) {
     document.getElementById('map').appendChild(xml.documentElement);
 });
 
 Tabletop.init({
     key: '1JO1w3K-grp4cANu6miMO8sS8eLzT-48prnpfJAifbfk', // ID the Google Docs (e.g. https://docs.google.com/spreadsheets/d/1OmZsftlrwsMSIYptbM0jqRNqG0bBFTtcjPM9KRJXfvg/pubhtml)
     callback: function(data, tabletop) {
         var svg = d3.select('#map svg');
         for (i in data) {
             var canton = data[i];
			

             var path = svg.select('#' + canton.canton),
                 yes = parseFloat(canton.oui),
                 $legend = jQuery('.container .legend');

             if (!isNaN(yes)) {
                 var fill = '#F8CC88';
                 switch(true) {
                     case yes <= 100 && yes >= 80:
                         fill = '#008A3B';
                     break;
                     case yes >= 80:
                         fill = '#8FA82E';
                     break;
                     case yes >= 50.1:
                         fill = '#B9C676';
                     break;
                     case yes == 50:
                         fill = '#F8CC88';
                     break;
                     case yes >= 40:
                         fill = '#E9624E';
                     break;
                     case yes >= 20:
                         fill = '#E7412B';
                     break;
                     case yes >= 0:
                         fill = '#FF1D24';
                     break;
                 }

                 path
                     .style('fill', fill)
                     .attr('data-yes', yes)
                     .attr('data-no', (100-yes))
                     .on('mouseover', function() {
                         var $this = jQuery(this);
                         $legend.append('<big><p style="border-radius:20px;position:relative;left:5px;border:1px dotted grey;padding-left:10px;padding-right:10px;padding-top:5px;padding-bottom:5px;"><strong>' + $(this).attr('id') + '</strong><br>Oui : ' + $this.data('yes') + '%<br>Non : ' + $this.data('no') + '%</p></big>');
                     })
                     .on('mouseout', function() {
                         $legend.empty();
                     })
                 ;
             }
         }
     },
     simpleSheet: true
 });
