import { forwardRef, useContext, useImperativeHandle, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { CreateTemplateContext } from "../../pages/CreateTemplate";

const Layer = () => {};

// const LayerContainer = () => {
//   // const editor = useContext(CreateTemplateContext).editor;
//   console.log('LayerContainer');
//   const onDragEnd = (result) => {
//     // if (result.combine) {
//     //   if (result.type === "COLUMN") {
//     //     const shallow = [...ordered];
//     //     shallow.splice(result.source.index, 1);
//     //     setOrdered(shallow);
//     //     return;
//     //   }

//     //   const column = columns[result.source.droppableId];
//     //   const withQuoteRemoved = [...column];

//     //   withQuoteRemoved.splice(result.source.index, 1);

//     //   const orderedColumns = {
//     //     ...columns,
//     //     [result.source.droppableId]: withQuoteRemoved,
//     //   };
//     //   setColumns(orderedColumns);
//     //   return;
//     // }

//     // // dropped nowhere
//     // if (!result.destination) {
//     //   return;
//     // }

//     // const source = result.source;
//     // const destination = result.destination;

//     // // did not move anywhere - can bail early
//     // if (
//     //   source.droppableId === destination.droppableId &&
//     //   source.index === destination.index
//     // ) {
//     //   return;
//     // }

//     // // reordering column
//     // if (result.type === "COLUMN") {
//     //   const reorderedorder = reorder(ordered, source.index, destination.index);

//     //   setOrdered(reorderedorder);

//     //   return;
//     // }

//     // const data = reorderQuoteMap({
//     //   quoteMap: columns,
//     //   source,
//     //   destination,
//     // });

//     // setColumns(data.quoteMap);
//   };
//   return (
//     <></>
//     // <DragDropContext onDragEnd={onDragEnd}>
//     //   <Droppable
//     //     droppableId="board"
//     //     type="COLUMN"
//     //     direction="horizontal"
//     //     // ignoreContainerClipping={Boolean(containerHeight)}
//     //     // isCombineEnabled={isCombineEnabled}
//     //   >

//     //   </Droppable>
//     // </DragDropContext>
//   );
// };

// eslint-disable-next-line react/display-name
const LayerContainer = forwardRef((props, ref) => {
  const editor = useContext(CreateTemplateContext).editor;
  const [layers, setLayers] = useState([]);


    const onDragEnd = (result) => {
    // if (result.combine) {
    //   if (result.type === "COLUMN") {
    //     const shallow = [...ordered];
    //     shallow.splice(result.source.index, 1);
    //     setOrdered(shallow);
    //     return;
    //   }

    //   const column = columns[result.source.droppableId];
    //   const withQuoteRemoved = [...column];

    //   withQuoteRemoved.splice(result.source.index, 1);

    //   const orderedColumns = {
    //     ...columns,
    //     [result.source.droppableId]: withQuoteRemoved,
    //   };
    //   setColumns(orderedColumns);
    //   return;
    // }

    // // dropped nowhere
    // if (!result.destination) {
    //   return;
    // }

    // const source = result.source;
    // const destination = result.destination;

    // // did not move anywhere - can bail early
    // if (
    //   source.droppableId === destination.droppableId &&
    //   source.index === destination.index
    // ) {
    //   return;
    // }

    // // reordering column
    // if (result.type === "COLUMN") {
    //   const reorderedorder = reorder(ordered, source.index, destination.index);

    //   setOrdered(reorderedorder);

    //   return;
    // }

    // const data = reorderQuoteMap({
    //   quoteMap: columns,
    //   source,
    //   destination,
    // });

    // setColumns(data.quoteMap);
  };

  // Use useImperativeHandle to customize the instance value exposed by the ref
  useImperativeHandle(ref, () => ({
    // Expose a custom function
    renderLayers: () => {
      setLayers(editor?.getJson().objects);
    },
  }));
  console.log(layers);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        // ignoreContainerClipping={Boolean(containerHeight)}
        // isCombineEnabled={isCombineEnabled}
      >
        <div className="">
          1
        </div>
      </Droppable> */}
      <div className=""></div>
    </DragDropContext>
  );
});

export default LayerContainer;
