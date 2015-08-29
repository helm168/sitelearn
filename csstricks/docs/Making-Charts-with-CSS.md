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

