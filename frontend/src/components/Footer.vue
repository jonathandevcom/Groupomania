<template>
  <div>
    <nav>
      <ul>
        <li>
          <a href="/LegalNotice">Mentions légales</a>
        </li>
        <li class="right_place">
          <a href="mailto:contact@groupomania.com">Contactez-nous</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  position: static;
  bottom: 0;
  height: 60px;
  width: 100%;
  display: inline-block;
}

.footer nav  {
  display:flex;
  justify-content: space-between;
}

</style>
