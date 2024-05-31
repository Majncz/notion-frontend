import { ref } from 'vue';
import { defineStore } from 'pinia'

export const useContextStore = defineStore('context', () => {
  const dropdown = ref([
    {
      text: "Option 1",
      sub: [
        {
          text: "Sub Option 1",
          sub: [
            {
              text: "Sub Sub Option 1",
            }
          ]
        },
        {
          text: "Sub Option 2",
        },
      ]
    },
    {
      text: "Option 2",
    }
  ]);

  let visible = false;

  function dropdownArray() {
    const addUUID = (items, parentUuid = "main") => items.map(item => {
      const uuid = crypto.randomUUID();
      return {
        ...item,
        uuid: uuid,
        parentUuid: parentUuid,
        sub: item.sub ? addUUID(item.sub, uuid) : []
      };
    });

    const dropdownWithUUID = addUUID(dropdown.value);

    const flattenDropdown = (items) => {
      return items.reduce((acc, item) => {
        const { sub, ...rest } = item;
        acc.push(rest);
        if (sub && sub.length) {
          acc.push(...flattenDropdown(sub));
        }
        return acc;
      }, []);
    };

    const flattenedDropdown = flattenDropdown(dropdownWithUUID);

    const groupedByParentUuid = flattenedDropdown.reduce((acc, item) => {
      if (!acc[item.parentUuid]) {
        acc[item.parentUuid] = [];
      }
      acc[item.parentUuid].push(item);
      return acc;
    }, {});

    const removeParentUuidsFromGrouped = Object.entries(groupedByParentUuid).reduce((acc, [key, value]) => {
      acc[key] = value.map(({ parentUuid, ...rest }) => rest);
      return acc;
    }, {});

    return Object.keys(removeParentUuidsFromGrouped).map(key => {
      if (key === "main") {
        return {
          parent: key,
          items: removeParentUuidsFromGrouped[key],
          visible: true,
          mouseOver: true
        }
      }
      return {
        parent: key,
        items: removeParentUuidsFromGrouped[key],
        visible: false,
        position: {
          x: 0,
          y: 0
        },
        mouseOver: false
      }
    });
  }

  return {
    visible,
    dropdownArray,
    dropdown
  }
})

