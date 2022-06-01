# LOCO-CORP FootBot/SoccerBot ![Badge stato build](https://github.com/them1rk/lococorp-soccerbot/workflows/MakeCode/badge.svg)

## What do you need
in order to use this code you need:
- LocoCorp's Custom MaQueen
- 2 Micro:Bit
- 1 DFRobot Controller for each MaQueen
- the LocoCorp's code for the SoccerBot/footBot controller
- the MaQueen Extension for Micro:Bit

## **_BEFORE USAGE_**
be sure that the `group` is set to the exact number as the controller's group. For best results it's recommended to differ the differents group by 10 (__E.G SoccerBot1&Controller1 have group 10 but SoccerBot2&Controller2 have group 20__ ).

![group](https://github.com/them1rk/lococorp-soccerbot/raw/master/.github/makecode/group.png) 
>view from the controller program

![group2](https://github.com/them1rk/lococorp-soccerbot/raw/master/.github/makecode/group2.png)

>view from the soccerbot program

## How to Install

1) Make a new Micro:Bit file
2) Go under the Tab Advanced -> extensions

![tab](https://github.com/them1rk/lococorp-soccerbot/raw/master/.github/makecode/extensionTab.png)

3) Search the MaQueen Extension. And download the first one

![maQueen](https://github.com/them1rk/lococorp-soccerbot/raw/master/.github/makecode/maQueenExtension.png)

4) download the `main.ts` and copy/paste the code

5) ***have fun***

# HOW TO PLAY

### Let's take a look at how is the controller preset

![controller](https://github.com/them1rk/lococorp-soccerbot/raw/master/.github/makecode/controller.png)

The Green, Red, Blue can be setted up as you please.

*before making any changes to the code, be aware of the [Micro:Bit scheduler](https://makecode.microbit.org/device/reactive)*

### Play field and Rules

![playfield](https://github.com/them1rk/lococorp-soccerbot/raw/master/.github/makecode/fieldsAndRules.png)

#### Rules (in case it's not readable in the image above)
1) the Bots must start at the side of the field before the black line on the side of the goal

2) at the beginning of the round, be sure that you cant grab in the non-grab area

3) you can exploit the sensors beneath the robot in order to grab in the non-grab area during the match, but you can't score while holding the ball. this will result in a faul(1 min stop)

### Blocks preview
![Un'immagine renderizzata dei blocchi](https://github.com/them1rk/lococorp-soccerbot/raw/master/.github/makecode/blocks.png)

#### Metadata

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
