# Evolutions

* Remove composites
  * layout clip
  * hit test visible

* Convert `visibility: Visibility` to `visible: boolean`

* Components will not represent application components, only:
  * shapes
  * text

* Create TextEdit
  * editable text region
* Create TextView
  * viewable text region
* Compose TextBox with TextEdit
  * padding is just margin in between TextEdit and rest of visual
* Compose TextBlock with TextView
  * padding is just margin in between TextView and rest of visual