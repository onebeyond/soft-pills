---
outline: deep
sidebar: false
---

# How to add a pill:

If you want to add a pill, you have to follow these steps:

1. Download the repo [here](https://github.com/onebeyond/soft-pills)
2. Install dependencies using npm (there is a lockfile)
3. Launch the script `npm run create:pill`
4. Follow the instructions

![Alt text](../assets/addPill.png "a title")



```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data
<pre>{{ theme }}</pre>

### Page Data
<pre>{{ page }}</pre>

### Page Frontmatter
<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data
<pre>{{ theme }}</pre>

### Page Data
<pre>{{ page }}</pre>

### Page Frontmatter
<pre>{{ frontmatter }}</pre>

## More

Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).
