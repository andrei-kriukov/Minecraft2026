controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy += -175
    }
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (controller.A.isPressed() && controller.down.isPressed() && mySprite.isHittingTile(CollisionDirection.Bottom)) {
        tiles.setWallAt(location, false)
        tiles.setTileAt(location, assets.tile`transparency16`)
        music.knock.play()
        info.changeScoreBy(1)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (inventory_open) {
        if (inventory.get_items()[inventory.get_number(InventoryNumberAttribute.SelectedIndex)]) {
            toolbar.get_items().push(inventory.get_items().removeAt(inventory.get_number(InventoryNumberAttribute.SelectedIndex)))
        }
    }
    toolbar.update()
    inventory.update()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    MySpriteLocation = tiles.locationOfSprite(mySprite)
    if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)]) {
        if ("pickaxe" == toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name)) {
            if (controller.A.isPressed()) {
                tiles.setWallAt(tiles.locationInDirection(MySpriteLocation, CollisionDirection.Left), false)
                tiles.setTileAt(tiles.locationInDirection(MySpriteLocation, CollisionDirection.Left), assets.tile`transparency16`)
                music.knock.play()
                info.changeScoreBy(1)
            }
        }
    }
    if (controller.B.isPressed() && info.score() > 0) {
        tiles.setWallAt(tiles.locationInDirection(MySpriteLocation, CollisionDirection.Left), true)
        tiles.setTileAt(tiles.locationInDirection(MySpriteLocation, CollisionDirection.Left), assets.tile`myTile0`)
        info.changeScoreBy(-1)
    }
})
function switch_between_toolbar_and_inventory () {
	
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    MySpriteLocation = tiles.locationOfSprite(mySprite)
    if (inventory_open) {
        inventory.change_number(InventoryNumberAttribute.SelectedIndex, 1)
    }
    if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)]) {
        if ("pickaxe" == toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name)) {
            if (controller.A.isPressed()) {
                tiles.setWallAt(tiles.locationInDirection(MySpriteLocation, CollisionDirection.Right), false)
                tiles.setTileAt(tiles.locationInDirection(MySpriteLocation, CollisionDirection.Right), assets.tile`transparency16`)
                music.knock.play()
                info.changeScoreBy(1)
            }
        }
    }
    if (controller.B.isPressed() && info.score() > 0) {
        tiles.setWallAt(tiles.locationInDirection(MySpriteLocation, CollisionDirection.Right), true)
        tiles.setTileAt(tiles.locationInDirection(MySpriteLocation, CollisionDirection.Right), assets.tile`myTile0`)
        info.changeScoreBy(-1)
    }
})
function create_toolbar_and_inventory2 () {
    toolbar = Inventory.create_toolbar([], 1)
    toolbar.left = 4
    toolbar.bottom = scene.screenHeight() - 4
    toolbar.z = 100
    toolbar.setFlag(SpriteFlag.RelativeToCamera, true)
    inventory = Inventory.create_inventory([], 5)
    inventory.set_number(InventoryNumberAttribute.SelectedIndex, -1)
    inventory.left = 4
    inventory.top = 4
    inventory.z = 100
    inventory.setFlag(SpriteFlag.RelativeToCamera, true)
    inventory_open = false
    inventory.setFlag(SpriteFlag.Invisible, !(inventory_open))
    toolbar_selected = true
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    MySpriteLocation = tiles.locationOfSprite(mySprite)
    if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)]) {
        if ("pickaxe" == toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name)) {
            if (controller.A.isPressed()) {
                tiles.setWallAt(tiles.locationInDirection(MySpriteLocation, CollisionDirection.Bottom), false)
                tiles.setTileAt(tiles.locationInDirection(MySpriteLocation, CollisionDirection.Bottom), assets.tile`transparency16`)
                music.knock.play()
                info.changeScoreBy(1)
            }
        }
    }
    if (controller.B.isPressed() && info.score() > 0) {
        tiles.setWallAt(tiles.locationInDirection(MySpriteLocation, CollisionDirection.Bottom), true)
        tiles.setTileAt(tiles.locationInDirection(MySpriteLocation, CollisionDirection.Bottom), assets.tile`myTile0`)
        info.changeScoreBy(-1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Player, function (sprite, otherSprite) {
    all_tools = [Inventory.create_item("pickaxe", img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . b b b b b b . . . . . . 
        . . . b . . e e . . b . . . . . 
        . . . . . . e e . . . . . . . . 
        . . . . . . e e . . . . . . . . 
        . . . . . . e e . . . . . . . . 
        . . . . . . e e . . . . . . . . 
        . . . . . . e e . . . . . . . . 
        . . . . . . e e . . . . . . . . 
        . . . . . . e e . . . . . . . . 
        `, "a stone pickaxe")]
    sprites.destroy(pickaxe, effects.fire, 1000)
    inventory.get_items().push(all_tools._pickRandom())
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    inventory_open = !(inventory_open)
    inventory.set_number(InventoryNumberAttribute.SelectedIndex, inventory.get_number(InventoryNumberAttribute.SelectedIndex))
    inventory.setFlag(SpriteFlag.Invisible, !(inventory_open))
    if (!(inventory_open)) {
        inventory.set_number(InventoryNumberAttribute.SelectedIndex, -1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    myEnemy.x = -40
})
let all_tools: Inventory.Item[] = []
let toolbar_selected = false
let MySpriteLocation: tiles.Location = null
let toolbar: Inventory.Toolbar = null
let inventory: Inventory.Inventory = null
let inventory_open = false
let blocks = 0
let pickaxe: Sprite = null
let myEnemy: Sprite = null
let mySprite: Sprite = null
tiles.placeOnRandomTile(mySprite, assets.tile`myTile7`)
create_toolbar_and_inventory2()
game.showLongText("minecraft    start", DialogLayout.Full)
mySprite = sprites.create(img`
    . . . . . . f f f f f f . . . . 
    . . . . f f e e e e f 2 f . . . 
    . . . f f e e e e f 2 2 2 f . . 
    . . . f e e e f f e e e e f . . 
    . . . f f f f e e 2 2 2 2 e f . 
    . . . f e 2 2 2 f f f f e 2 f . 
    . . f f f f f f f e e e f f f . 
    . . f f e 4 4 e b f 4 4 e e f . 
    . . f e e 4 d 4 3 f d d e f . . 
    . . . f e e e 4 d d d d f . . . 
    . . . . f f e e 4 4 4 e f . . . 
    . . . . . 4 d d e 2 2 2 f . . . 
    . . . . . e d d e 2 2 2 f . . . 
    . . . . . f e e f 4 5 5 f . . . 
    . . . . . . f f f f f f . . . . 
    . . . . . . . f f f . . . . . . 
    `, SpriteKind.Player)
let PixelstoMetres = 30
let Gravity = 9.81 * PixelstoMetres
info.setLife(10)
color.setColor(1, color.rgb(255, 255, 255))
controller.moveSprite(mySprite, 100, 0)
scene.setBackgroundColor(9)
tiles.setCurrentTilemap(tilemap`level1`)
myEnemy = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . 7 7 7 7 7 
    . . . . . . . . . . . 7 f 7 f 7 
    . . . . . . . . . . . 7 7 7 7 7 
    . . . . . . . . . . . 7 7 f 7 7 
    . . . . . . . . . . . . 7 7 7 . 
    . . . . . . . . . . . 8 8 7 7 8 
    . . . . . . . . 7 7 7 8 8 8 8 8 
    . . . . . . . . . . . 8 8 8 8 8 
    . . . . . . . . 7 7 7 8 8 8 8 8 
    . . . . . . . . . . . 6 6 . 6 6 
    . . . . . . . . . . . 6 6 . 6 6 
    . . . . . . . . . . . 6 6 . 6 6 
    . . . . . . . . . . . f f . f f 
    `, SpriteKind.Enemy)
myEnemy.ay = 500
pickaxe = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . b b b b b b . . . . . . 
    . . . b . . e e . . b . . . . . 
    . . . . . . e e . . . . . . . . 
    . . . . . . e e . . . . . . . . 
    . . . . . . e e . . . . . . . . 
    . . . . . . e e . . . . . . . . 
    . . . . . . e e . . . . . . . . 
    . . . . . . e e . . . . . . . . 
    . . . . . . e e . . . . . . . . 
    `, SpriteKind.Player)
mySprite.ay = Gravity
tiles.placeOnRandomTile(mySprite, assets.tile`transparency16`)
tiles.placeOnRandomTile(pickaxe, assets.tile`myTile`)
pickaxe.y += -16
scene.cameraFollowSprite(mySprite)
info.setScore(blocks)
game.onUpdate(function () {
    if (myEnemy.x < mySprite.x) {
        myEnemy.vx = 50
    } else {
        myEnemy.vx = -50
    }
})
