<template>
  <div>
    <strong>{{title}}</strong>
    <ul class="list" v-if="list.length > 0">
      <li class="list-item" v-for="item in list" :key="item.id">
        <p>{{item.text}}</p>
        <template v-if="item.child">
          <ul class="list" v-if="item.type === 'list'">
            <li class="list-item" v-for="subitem in item.child.list" :key="subitem.id">
              <p>{{subitem.text}}</p>
              <ul class="list" v-if="subitem.sublist">
                <li class="list-item" v-for="subListItem in subitem.sublist" :key="subListItem.id">
                  <p>{{subListItem.text}}</p>
                </li>
              </ul>
            </li>
          </ul>
          <div v-if="item.type === 'image'" class="image">
            <img :src="getImageUrl(item.child.src)" :alt="item.child.alt || 'list item'" />
          </div>
          <div v-if="item.type === 'table'">
            <div class="table-container">
              <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                  <th v-for="col in item.child.cols" :key="col">
                    <span>{{col}}</span>
                  </th>
                </thead>
                <tbody>
                  <tr v-for="row in item.child.rows" :key="row.id">
                    <td v-for="prop in row.props" :key="prop">
                      <span>{{prop}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul class="list">
              <li
                class="list-item"
                v-for="subitem in item.child.list"
                :key="subitem.id"
              >{{subitem.text}}</li>
            </ul>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "list item" },
    list: { type: Array, default: () => [] }
  },
  methods: {
    getImageUrl(url) {
      return require(`@/assets/images/${url}`);
    }
  }
};
</script>

<style lang="scss">
.image {
  display: flex !important;
  position: relative;
  width: 100%;
  justify-content: center;
  img {
    width: 15% !important;
  }
}
.list {
  box-shadow: 0 2px 3px #0a0a0a59, 0 0 0 1px #0a0a0a59 !important;
}
.list-item {
  font-size: 0.75rem;
  font-weight: bold;
  background: white;
  .table,
  .list {
    margin: 1em 0;
  }
}
.list-item:not(:last-child) {
  border-bottom: 1px solid #0a0a0a59 !important;
}
@media (min-width: 320px) and (max-width: 410px) {
  .image {
    img {
      width: 100% !important;
    }
  }
  .list-item {
    font-size: 0.65rem;
  }
}
@media (min-width: 410px) and (max-width: 750px) {
  .image {
    img {
      width: 75% !important;
    }
  }
}
@media (min-width: 750px) and (max-width: 1100px) {
  .image {
    img {
      width: 75% !important;
    }
  }
  .list-item {
    font-size: 1rem;
  }
}
</style>