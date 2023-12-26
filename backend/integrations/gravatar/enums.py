from enum import Enum


class GravatarType(str, Enum):
    NOT_FOUND = '404'
    MYSTERY_PERSON = 'mp'
    IDENTICON = 'identicon'
    MONSTERID = 'monsterid'
    WAVATAR = 'wavatar'
    RETRO = 'retro'
    ROBOHASH = 'robohash'
    BLANK = 'blank'
