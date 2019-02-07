import { Component, OnInit } from "@angular/core";
import { GraphService } from "./graphFile";

declare let d3;
declare let Math;

@Component({
  selector: "pm-graph",
  templateUrl: "./graph.component.html"
})
export class GraphComponent implements OnInit {
  constructor(private _graphService: GraphService) { }

  ngOnInit() {
    this.draw();
  }

  draw() {
    var width = 960,
      height = 500;

    var svg = d3
      .select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    var force = d3.layout
      .force()
      .gravity(0.05)
      .distance(100)
      .charge(-100)
      .size([width, height]);

    let json = this._graphService.getGraphJson();
    force
      .nodes(json.nodes)
      .links(json.links)
      .start();

    var link = svg
      .selectAll(".link")
      .data(json.links)
      .enter()
      .append("line")
      .attr("class", "link")
      .style("stroke-width", function (d) {
        return Math.sqrt(d.weight);
      });

    var node = svg
      .selectAll(".node")
      .data(json.nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .call(force.drag);

    node.append("svg:image")
      .attr('x', -9)
      .attr('y', -12)
      .attr('width', 20)
      .attr('height', 24)
      .attr("xlink:href", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEVCi8f////5+/0qgcM+icY3hsUyhMQvg8TT4e+WudxRksqHsNf09/sngMLh6vTG2Otons/p7/dhms6oxOGgv9+2zeZLj8lbl8zP3u52ptOBrNa60Ofu8/mSt9uuyOPB1ekAdr5yo9J05HFLAAAOV0lEQVR4nO1d6ZqjKhQ0yuKGe9SYaCbv/5IXNIuJqICY6P26fsx023a0WhDOOUVhHP7vMFa/ghl0iFPvhTS+HzVXv/5qDIOyLL0oim4uvgOCF+DjoHuj53j03GCtG9HP0G+OJ8PIIUKoY2NMoTuFngtzwzgdG1/7/Whk6F9CJ0MEd8wmeY1xRQgTlDnhRSNRTQztoKoMC0IoTWwI+imWUVWBrefWNDAMwqjAWOWxjYN+GsZFFGronUsZXj0MkU5ubzwRRN71dwx9u44IXIvdkyUkUW0v6JfKDO3KxavTe5DEbqXcK9UYhl6Otfa7WZIA5174LYZm5n6X3pOkmylMgaQZlh7SMSSogb54ynUZmlmCv//0+gA4kXyQUgwz9KV3yyRHCLN1GJqp9bvm+Q5opeLPUZShnxro18R6QEYqOkQKMjyC1SYuaqD3c9TI0E42xo8BoERoFiDA0M9+/P4cA8CZQFOdZxj8cPybA0Tzwccsw3oDA8Q4AKwXMrxoiWnXBISXJQwvxpYfYAdgTL9wJhmmOyBIKZJUlWG60XfoAHiK4gTD1Pr1nQvDmqA4znBHBCcpjjL08a/vWgp4dOwfY3j5QRS/BACMDRojDM2dEWQURwKqEYbHrQ/0Q8CRWIPPMN5XJ+yAYwmGp721UQZwEmcY7K+NMkBuoMFlWO3xEdKHWIkyDPY01vdh8R4ij6G9x/cMA+ZFGTyG3j67Ie2IniDDaJ/dkAJyRn0OQ5P8+kaVYQky3OuL5o/hH8M94I/hg+F+36VEjOGh3uuIDyIOGx7DbK8MucVhHsN4r82U8GJgbvS002kbt5HyGaZbKmiLA3GTpvwsxqYramMAkMuFz7DcY4SI+WIi3ngY7LInsl7IE8ZzGPpXeuruMsIGoQH+lZPb5zFkGsBsb+0Us3J3KMFwb6mMLoEhyrAr/u+qnQLQ3nMtyDBp/9tT9elReUrEGJqkOz3eDUUAuunaRTC2MP/d5fEXsI++CB+1w+s/0fjQvX918fYwfUPeozjqij5DCz814/X2wwzyVEWFWDiLAV5HbWvbnRFYr0w+/UY4T9NTiwWnLXdGeHoVY2ookYl6q/t7m400QL9QwUY3iVwb7JfiLsUGBbRMQlv09RcVlMsmwreScZhv7jkCmL+toWk7k1S+1HqLtvx6Y2MjBO8ztLK7aamM8DvFw8XZkNQUQuddIFTe71mKIUAfMbPvkG1whMT5mH+W9xeFZFYfWJ9pAb/egOYbokEEUT4Gbem6BRnUxS9XF/+SJMTudSBgs58TL/nKDE8nHnjkR4MHQMTjqC16RQiF2hOqOGlk/wy+tXy0Rw9icOaEf3HViw5UqmuAcIVGQZrDL5IEEOYp/0ZI/y7U6ofE4csa7SyxvsGSsrOSjK/HN5332EexQgpH5f7xtc7Xba+0beb1lS86pH9k4+Otp1oDBjgZucSBtdcEr7PwEkCEE37b7DBcz6pe5QZjTbVDGFYF1vkwmfdJUYVTi7dpAx1eb0kdH6KZdWJ24JwKCy/tmbTXYas4OTOuGH7GnXssUypA8DlXGv5m7GdORRhPKOVv0lrWMG6kcjI/nlsC6zsjccBCLQbtF5NttXcHzfHIajvMo+bhUvNO+HmsPQOyuspR1JzGdEb7/XK1CZ3zyqyHD0KKMonuKB7GQrh4HEpKdoqMg0k5Nf/XoaeBOCpVbTgejlHq7lBmGk1Oi/UohgA2pl7hKyJIjZkZsS5NFHuXp2Oj8FqIU4HxSKfqC1qF8z2SsVMI2R3oVX0BaEVRub7fmllGkSU4yoqqvhLRgQzQPgmOarYxYgiPhiFuFQN4s8ulSnY2opEoC3zdD9P0gywibDQVvxlhJbu01oS+ekhRZYGuV2wQZFVB5Ce6XL0Jj6GvtMCZ0kRR4oTLvLmuoZNESG0WDwzeSM1Xfakmm+jsks7BoHtsGlmi16Y5upD9unLpGYqrvhavr4TMN88iuVNTXOI7Xn9h/3Howk5wcmIxv76FSbyRNZZ81ZcmhSmLF+DT5tLKTw/k1tMQk0FPYDliPTSyhvSflmt+oOfuucbH/+NT4TC8XPtJ1t2gVX1xljuPaaKq36fv5dBWPKVUX+7WCobTAK1+RJShw/6N92KK0QJ0y5x5eZZx1Ve8p3YKuzhHVPVldf012M9DBN188SIaPf27RwvBJgUKQ4CHW1QorPp6TNH30RfB02rAE1Z9kcewEhTb74yweIQ0FyKexcif31RbH/rJS/mTS+RpeoGWzSkPbAegV4inYa1EJsp9fRvctitqx7de0O1K5dre8gE0bvs1FS5oHNq7S09S9fUmwzCrDTZVQKo+nzZWkFN9vSVdLptyL2VAxlscEcirvsDHYr6zu6HBEWD3/HZ3cdfIJFVfp4+c9rXYyisHFx9ZIDtRU33hz+xgmG/gOQKcf+agn9NL2boFR0sTej9WKEI4tGZ/aWrkKzMcw5f4+LsOSbvfcVgO6tnpyDMEgCNsM4PT+lsicOhBcuKVVuteXkuhuga4wrbDoYmwVEVhKTuAcNTwbiSu+iGeUv0QgvPwlAPL5hTgOyQpPVDwMjAU53dRhlqFFKDbSOE+PleuaGVPmR603Oo8Uov1bx8xumoNGOaj3pmmn8qWwMTJtYW7dLxul+af73XlKveMOXh4rAykV9vGKjxGNVl85dmoL6jjAyualmHZZR257O2zlCdTEWE3qsuZ60W8BVmLlAoAz3Bkw4hdeRWxkFqtBUCILEI/wZ7V29gRf0xeqvqa58jgm2WWngghrK50j0j4hO9HEatP0fNPaVaaImqkMX4a1CYAJ7Z4vT4+U+Qug4HRENhof5az08SFK6Y9sU2KBj0NwKBRqNZfbB5mzNR5CBowNWfUohiiA9RJejcbTShPM8OvNtUXNqo1RTR8hJUxO+XXp/qib3RSK2sU5eGXNRGZVuhVfUFsnOxviBQD+2QILkUSVX0VQp/Wir5gcV63vYZeAsVlXwXnExarvuhrP1F5vQogaBK5yaCw6iuUzDi1oq86i/X1Sz/OagXZF+a1J22qL0jDnNPtai/dW9O2r7cTDcoU0kESqi9FDyW2pABBN/fOZ8G9mN5wPJ+93IVM9qV4fXE3s0VWya22DdF5JkmzLDV9hhFO7c9Mdho7HS3RtDFwjZJHNFF6jLCeki+SeDwk5Cn80nE5/iMcU31prosCPvRehPCpjCiGdmgOyYR7MpooYa33VtBqvGUY2jtRmjwAkC3JcG/m+l25U5Rhp/o6bqWWJgLcDcCiqq/7/HUXJlEd0H1CWoiqvu5ZE28vTxHfCcbCqi/n/tVxgwKFIQB5zBEdcdXXozkHmzPeGQI8N1/xxVVfLzsMO9n60A9fBYcaiudprNc76baB0v04AL4979S3ZLy+eumAcMNjP0C9mLeQ8vp6WyN12uqwgfp2XWw9mgRDAPqpl+OgULcFwLwfZ7e+wFL5UvRWSuBZNPwW4DmmtYjbdian+nrf4yuuNmT1xYLrDwXFSUH1hT52wIq9zbxVAfY+ilV3oyHJrD783OQrrjZhZwbJQAHzWMMkW7eAg83o4gb9eOwACDWDYuPTnlO6MgNvw2R2U3xTKvRBD6BiqBsKbs+WpaL64uTrgyr/iWcbxHnFu51lqi/DcIYnHEzbIes4J40BQEQcboXd6Z+m5GYGDX4xuvQkrAAW0gPY8Ph154vx9odWVH3l5xF1Qlmp1RekwOoh1UhZ3TznWlRfABdj1TM/TmsFZwBRsKJWnY7WtILic4RWV33B28hF2OlxCplISDM7Jh+C6ZRl1G34l12i+iJcdecT9rV2gSbJKZN9Abe+TtfpGt5MeZFSARrNjFgosO1btcjQrLMyq272nD7AbD7d9jQwZNbEU9vQP345vmSOR6zW0QzO11/A3ciMUrOI52SXWSuzQyu75H/qUrUJQHznCS4uTdM4LUX4Enp1lD8PQIeeKy6QSuHozHG5nmZMTT6JOHygrJmzWVKXzyOyRkwzKno9qi/uioDvYHYlhC5NFG9VxxcgsJpFo+oLWfV35XtlbQnEbVr3sIQY1vZ3mmts11AsmtG9hyXE+DYyI9aH0rth4WBNVNfmSdhy0qAtOq+l3wvOkZSLLxBVfTlSc0w2ySJ5Vmr1MzP9MsuJ7DQQ8oJZHsNYvsBNR3Er97wgWK5t84PA83JLJcK2hPewVBNiAOYYmUfJOQzVHqcZhueEtkusKI3iWu7xGS7Y/rCzlWX/Zk0jOmqGTZOh528qX5u/ASJfE7VYTdNNp5FFQVDm3FGXzNnsUtaPAxki7BTUTdKXXpPvyc1nuEi6NwB8ArVCNvQ6oPMyfOHemK6t2EoCXxyAJ4EeZ2hufCOrIbi7WU0wPJS7Yzg2uRpjuM89LKUYHja9G9knhkUkAYZ7st0bFALFGO6H4hTBSYbbFWG8A4030TmGh9MetHt4kuAMw8N588I2APmOCKIMD2Wy7ZaKkrkkwxzDw6He8PQGWBxnEmmGn94TG8KYZ4csw4OZbU4RxQBIJhJpizBk261urzeik1gCTIwhbap4UyJMgLBAA5VieDg0+XaeI8qnC7ZqDA/m0d3EcwQoP0qkuiQYUhwlVh2vRA9gKLd8U44hk1iBHz5Iem2OEE0vw/kdidYDxFEqn4mVZ3gQLXXphXJBT4khS0973/RsA5B4iol0VYYM16r4hnwPQFRUCzY+WcCQIsgquOYmloB+epUtK94tY0hxiZ2cLN72kEcOYpI7sYJNj2aGLeymBnDhavoeufaz6mapPUMHPQwZgjBNIrDM0Ky1MgNRkkptGDgNfQxbxMzQjDkJSJZdOnMCkjArM83yB80MO/i+md2tICz0vo9lH92PrLvBRGaOuksswioM+zieX6Zm72htzJQ8QqSwOsOf44/h/vHHcP/4Y7h//DHcP/7/DP8DkwLY8Nxtll0AAAAASUVORK5CYII=");

    node
      .append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function (d) {
        return d.name;
      });

    force.on("tick", function () {
      link
        .attr("x1", function (d) {
          return d.source.x;
        })
        .attr("y1", function (d) {
          return d.source.y;
        })
        .attr("x2", function (d) {
          return d.target.x;
        })
        .attr("y2", function (d) {
          return d.target.y;
        });

      node.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
    });
  }
}
