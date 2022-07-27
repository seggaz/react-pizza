import { CartSliceState, CartItem } from '.././cart/types';
import { calcTotalPrice } from '../../../utils/calcTotalPrice';
import { getCartFromLocalStorage } from '../../../utils/getCartFromLocalStorage';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: CartSliceState = getCartFromLocalStorage();

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			const findItem = state.items.find(obj => obj.id === action.payload.id);
			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}

			state.totalPrice = calcTotalPrice(state.items);
		},
		minusItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find((obj) => obj.id === action.payload);

			if (findItem) {
				findItem.count--;
			}
		},
		removeItem(state, action: PayloadAction<string>) {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},
		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
		}
	},
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;