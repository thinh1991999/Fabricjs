import ShapeProperties from './ShapeProperties'

const ShapeBuilder = ({ selectedObject, editor }) => {
  return (
    <div>
        <ShapeProperties selectedObject={selectedObject} editor={editor}/>
    </div>
  )
}

export default ShapeBuilder