import { expect } from 'chai';
import { StarEffect } from '../../panel/effects/stars';
import { PetSize, ColorThemeKind } from '../../common/types';

describe('StarEffect', () => {
    let starEffect: StarEffect;

    beforeEach(() => {
        starEffect = new StarEffect();
    });

    it('should be disabled during the daytime', () => {
        const canvas = document.createElement('canvas');
        starEffect.init(
            canvas,
            canvas,
            PetSize.medium,
            0,
            ColorThemeKind.light,
        );
        expect(starEffect.enabled).to.be.false;
    });

    it('should be enabled during the nighttime', () => {
        const canvas = document.createElement('canvas');
        starEffect.init(canvas, canvas, PetSize.medium, 0, ColorThemeKind.dark);
        expect(starEffect.enabled).to.be.true;
    });

    it('should initialize stars with correct properties', () => {
        const canvas = document.createElement('canvas');
        starEffect.init(canvas, canvas, PetSize.nano, 0, ColorThemeKind.dark);
        expect(starEffect.stars).to.have.lengthOf(50);
        expect(starEffect.stars[0]).to.have.property('x');
        expect(starEffect.stars[0]).to.have.property('y');
        expect(starEffect.stars[0]).to.have.property('size');
        expect(starEffect.stars[0]).to.have.property('brightness');
    });
});
