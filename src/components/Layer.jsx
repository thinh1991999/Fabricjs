/* eslint-disable react/no-unknown-property */
import {
  forwardRef,
  useContext,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { TextInput } from "flowbite-react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { CreateTemplateContext } from "../pages/CreateTemplate";
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle, isActive) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isActive || isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

// eslint-disable-next-line react/display-name
const LayerContainer = forwardRef((props, ref) => {
  const editor = useContext(props.TemplateContext).editor;
  const selectedObjects = useContext(props.TemplateContext).selectedObjects;

  const [layers, setLayers] = useState([]);
  const [editableLayer, setEditableLayer] = useState();

  const selectedObjId = useMemo(() => {
    if (selectedObjects.length < 1) return;
    return selectedObjects[0].id;
  }, [selectedObjects]);

  const handleSetActiveObj = (id) => {
    editor?.selectObj(id);
  };

  const handleDoubleClickObj = (layer) => {
    setEditableLayer(layer);
  };

  const handleChangeNameObj = (e) => {
    editor?.changeNameObj(editableLayer.id, e.target.value);
    setEditableLayer(null);
  };

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

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const items = reorder(
      layers,
      result.source.index,
      result.destination.index
    );
    setLayers(items);
    editor?.selectObj(result.draggableId);
    editor?.reorderObj(result.draggableId, result.destination.index);
  };
  // Use useImperativeHandle to customize the instance value exposed by the ref
  useImperativeHandle(ref, () => ({
    // Expose a custom function
    renderLayers: () => {
      setLayers(editor?.getObjects());
    },
  }));
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {layers.map((layer, idx) => {
              return layer.id === editableLayer?.id ? (
                <TextInput
                  type="text"
                  defaultValue={editableLayer.name}
                  onBlur={handleChangeNameObj}
                />
              ) : (
                <Draggable draggableId={layer.id} key={layer.id} index={idx}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        selectedObjId === layer.id
                      )}
                      onClick={() => {
                        handleSetActiveObj(layer.id);
                      }}
                      onDoubleClick={() => {
                        handleDoubleClickObj(layer);
                      }}
                      // className="p-10 bg-gray-200 my-5 rounded-md "
                    >
                      <span>{layer.name}</span>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className=""></div>
    </DragDropContext>
  );
});

export default LayerContainer;
