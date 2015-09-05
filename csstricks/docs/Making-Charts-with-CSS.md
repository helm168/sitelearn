There are many ways to make visual representations of data: bar charts, line graphs, scatter diagrams, sparklines... not to mention the many ways in which you can implement them on the web. In this post I'll be looking at plain CSS methods for styling data. But before we take a look at some examples, I think it's worth briefly going over our design goals first.

### Guidelines for Chart Making

There are three guidelines to developing a chart on the web:

1. **Accessibility**: everyone should be able to view some format of the data we present, even if it's a boring table (boring is better than nothing).
2. **Ease of development**: graph-making shouldn't be unnecessarily complex, and we'll certainly want to avoid technical debt for the future.
3. Performance: we need to make sure that users don't spend a lot of time waiting for assets to download or for elements to be painted to the screen.

These goals are likely to change depending on the type of chart that make, as performance is going to be less of a concern for a static bar chart than <a href="#">a crazy interactive map</a>. With these guidelines in mind, let's look at a few examples.

### CSS Bar Charts

There are a couple of ways to make a simple bar chart in CSS. For starters we'll use a definition list for our data:

```markup
<dl>
  <dt>title of the graph</dt>
  <dd class="percentage">
    <span class="text">
      Data 1: 20%
    </span>
  </dd>
  <dd class="percentage">
    <span class="text">
      Data 2: 50%
    </span>
  </dd>
  <dd class="percentage">
    <span class="text">
      Data 3: 30%
    </span>
  </dd>
</dl>
```

We'll absolutely position the text content of each dd to the left with that span.

To make the "bars" that visually represent the data, we'll use pseudo elements. To do that we could update the markup with classes like .percentage-20, and set a width on its pseudo element:

```css
.percentage:after {
  content: "";
  display: block;
  background-color: #3d9970;
}
.percentage-20:after {
  width: 20%;
}
.percentage-30:after {
  width: 30%;
}
```

But we don't want to have to write out every single one of these classes by hand because the data is likely to change in the future. We could write a Sass loop to make all those classes for us:

```css
@for $i from 1 through 100 {
  .percentage-#{$i}:after {
    $value: ($i * 1%);
    width: $value;
  }
}
```

That's a little icky as it'll create a whole bunch of classes that we probably won't be using in the final implementation, but there are lots of tools to tidy this up for us in production.

Next, we can add those classes we've automatically generated to each .percentage element, like so:

```markup
<dl>
  <dt>A title of the graph</dt>
  <dd class="percentage percentage-7">
    <span class="text">
      IE 11: 7%
    </span>
  </dd>
  <dd class="percentage percentage-20">
    <span class="text">
      Chrome: 20%
    </span>
  </dd>
  <dd class="percentage percentage-2">
    <span class="text">
      Android 4.4: 2%
    </span>
  </dd>
</dl>
```

Finally we can add rules to the background of each .percentage element to aid legibility in comparing these values with a repeating-linear-gradient:

```css
.percentage {
  background: repeating-linear-gradient( to right,
    #ddd,
    #ddd 1px,
    #fff 1px,
    #fff 5%
  );
}
```

<iframe src="https://codepen.io/css-tricks/embed/b46b85162c40677686cc4080baea8d02?height=450&theme-id=1&slug-hash=b46b85162c40677686cc4080baea8d02&default-tab=result&user=css-tricks" width="100%" height="369"></iframe>

This technique is relatively simple, but I can't help but think that this information should always be set in a table by default. Although I'm a little wary of styling tables in this way, that certainly doesn't mean it's impossible. For instance, Eric Meyer wrote about this technique and described how to position finicky table elements to behave like a bar chart. This is his original markup for the table:

```markup
<table id="q-graph">
    <caption>Quarterly Results</caption>
    <thead>
        <tr>
         <th></th>
            <th class="sent">Invoiced</th>
            <th class="paid">Collected</th>
        </tr>
    </thead>
    <tbody>
        <tr class="qtr" id="q1">
        <th scope="row">Q1</th>
        <td class="sent bar"><p>$18,450.00</p></td>
        <td class="paid bar"><p>$16,500.00</p></td>
    </tr>
        <tr class="qtr" id="q2">
        <th scope="row">Q2</th>
        <td class="sent bar"><p>$34,340.72</p></td>
        <td class="paid bar"><p>$32,340.72</p></td>
    </tr>
    <tr class="qtr" id="q3">
        <th scope="row">Q3</th>
        <td class="sent bar"><p>$43,145.52</p></td>
        <td class="paid bar"><p>$32,225.52</p></td>
    </tr>
    <tr class="qtr" id="q4">
        <th scope="row">Q4</th>
        <td class="sent bar"><p>$18,415.96</p></td>
        <td class="paid bar"><p>$32,425.00</p></td>
    </tr>
    </tbody>
</table>
```

Unlike the example I used earlier, where I implemented a number of automatically generated helper classes in Sass to define the width of the bar charts, Eric used inline styles on the td element with those values being calculated server side or with JavaScript, rather than added by hand.

The example below is my copy of Eric's original example where I've updated the styling a little bit:

<iframe src="https://codepen.io/css-tricks/embed/289ddf6daa8575b3c44914921f4a741f?height=568&theme-id=1&slug-hash=289ddf6daa8575b3c44914921f4a741f&default-tab=result&user=css-tricks" width="100%" height="369"></iframe>

I really like that each row in the table has a header such as Q1, Q2, etc. — that feels really neat and tidy rather than depending on a definition list to describe the content. They're easy to position and will fall back nicely to a standard table if the CSS fails to load for whatever reason.

However, one of the problems with this approach is that it requires absolutely positioning each table row side by side, which means that if we want to add more data then we'll need to do a lot more work than simply updating the markup. This means it could be a pain to work with in the future.

###Sparklines

We don't always have to use tables when representing information like this. That's probably the case when we make a series of sparklines, tiny graphs that sit next to a line of text and help readers get a quick overview of the information. Wilson Miner outlined this method and made sure to focus on the accessibility of the information beforehand:

```markup
<figure>
<ul class="sparklist">
  <li>
    <a href="http://www.example.com/fruits/apples/">Apples</a>
    <span class="sparkline">
      <span class="index"><span class="count" style="height: 27%;">(60,</span> </span>
      <span class="index"><span class="count" style="height: 97%;">220,</span> </span>
      <span class="index"><span class="count" style="height: 62%;">140,</span> </span>
      <span class="index"><span class="count" style="height: 35%;">80,</span> </span>
  </li>
</ul>
<figcaption>Fruits eaten in the last 14 days by type</figcaption>
</figure>
```

I've updated the original markup from what Wilson used since to me this feels like it should fit into a figure, as [the docs on MDN](http://www.baidu.com) state that:

>Usually [a figure]... is an image, an illustration, a diagram, a code snippet, or a schema that is referenced in the main text, but that can be moved to another page or to an appendix without affecting the main flow.

That makes a lot more sense to me than a plain ul element. But anyway, here's what that looks like without any CSS:

###Problems with making charts with CSS

* If you're using background to style an element then it (probably) won't be visible if the web page is printed. The only exception is if you use -webkit-print-color-adjust: exact; in a WebKit browser.

* Finicky control over design: absolutely positioning table rows, for instance, is likely to be pain for developers at some point in the future.

* Browser support is a laborious process in some instances, and ensuring that all devices support every CSS property might be difficult to test.

* It's not possible to use inline styles on pseudo elements, so if you want to style a pseudo element with JavaScript then this makes things a bit more complicated.

* It's possible to do anything with CSS, but when we're making pure CSS line graphs we should probably take a little while to reconsider the implications that this might have on the rest of the codebase.

###Wrapping up

Plain CSS and markup solutions for charts and graphs work to a certain extent, and in many situations they're probably the safest bet. But I think it's worth exploring alternative solutions to representing data.

In the next post in this series I'll be looking at SVG and JavaScript solutions to making charts.

###More information

* [Lea Verou on pie charts]()
* [Accessible data visualization]()
* [Eric Meyer's bar graph example]()
* [NYT's year in Interactive Storytelling, Graphics and Multimedia]()
* [CodePen's collection of charts and diagrams]()
