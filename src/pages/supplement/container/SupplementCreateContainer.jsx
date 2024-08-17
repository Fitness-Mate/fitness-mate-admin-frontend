import React from 'react';

import Loading from "../../../component/Loading";
import ConfirmModal from "../../../component/modal/ConfirmModal";
import AlertModal from "../../../component/modal/AlertModal";

import * as apiUtil from "../../../util/apiUtil";

class SupplementCreateContainer extends React.Component {
    constructor(props) {
        super(props);

        this.setLoading = this.setLoading.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.setConfirmMethod = this.setConfirmMethod.bind(this);
        this.setConfirmMessage = this.setConfirmMessage.bind(this);
        this.setAlertRedirectUrl = this.setAlertRedirectUrl.bind(this);
        this.setAlertMessage = this.setAlertMessage.bind(this);

        this.handleCreateBtnClick = this.handleCreateBtnClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.ajaxSupplementCreate = this.ajaxSupplementCreate.bind(this);

        this.state = {
            loading: false,
            confirmMethod: null,
            confirmMessage: '',
            alertRedirectUrl: null,
            alertMessage: '',
            confirmModalIsOpen: false,
            alertModalIsOpen: false,

            supplementType: 'Protein',
            korComName: '',
            engComName: '',
            korName: '',
            engName: '',
            image: '',
            flavor: '',
            marketLink: '',
            price: '',
            servings: '',
            description: '',

            //protein & gainer
            proteinPerServing: '',
            fatPerServing: '',
            carbohydratePerServing: '',
            source: '',

            //amino acid
            leucine: '',
            isoLeucine: '',
            valine: '',
            L_Carnitine: '',
            L_Glutamine: '',
            L_Alanine: '',
            L_Lysine: '',
            methionine: '',
            phenylalanine: '',
            threonine: '',
            histidine: '',
            tryptophan: '',

            //other
            other: ''
        }
    }

    /* handlers */
    setLoading(loading) {
        this.setState({ loading: loading });
    }
    toggleModal(modalName, value) {
        this.setState({ [modalName]: value });
    }

    handleCreateBtnClick() {
        this.setConfirmMessage('보조제를 생성하시겠습니까?');
        this.setConfirmMethod('create');
        this.toggleModal('confirmModalIsOpen', true);
    }
    setConfirmMethod(method) {
        if(method === 'create') this.setState({ confirmMethod: this.ajaxSupplementCreate });
    }
    setConfirmMessage(message) {
        this.setState({ confirmMessage: message });
    }
    setAlertRedirectUrl(url) {
        this.setState({ alertRedirectUrl: url });
    }
    setAlertMessage(message) {
        this.setState({ alertMessage: message });
    }

    async handleInputChange(e) {
        if(e.target.name === 'supplementType') await this.setState({ supplementType: e.target.value });
        if(e.target.name === 'korComName') await this.setState({ korComName: e.target.value });
        if(e.target.name === 'engComName') await this.setState({ engComName: e.target.value });
        if(e.target.name === 'korName') await this.setState({ korName: e.target.value });
        if(e.target.name === 'engName') await this.setState({ engName: e.target.value });
        if(e.target.name === 'image') await this.setState({ image: e.target.files[0] });
        if(e.target.name === 'flavor') await this.setState({ flavor: e.target.value });
        if(e.target.name === 'marketLink') await this.setState({ marketLink: e.target.value });
        if(e.target.name === 'price') await this.setState({ price: e.target.value });
        if(e.target.name === 'servings') await this.setState({ servings: e.target.value });
        if(e.target.name === 'description') await this.setState({ description: e.target.value });

        //protein & gainer
        if(e.target.name === 'proteinPerServing') await this.setState({ proteinPerServing: e.target.value });
        if(e.target.name === 'fatPerServing') await this.setState({ fatPerServing: e.target.value });
        if(e.target.name === 'carbohydratePerServing') await this.setState({ carbohydratePerServing: e.target.value });
        if(e.target.name === 'source') await this.setState({ source: e.target.value });

        //amino acid
        if(e.target.name === 'leucine') await this.setState({ leucine: e.target.value });
        if(e.target.name === 'isoLeucine') await this.setState({ isoLeucine: e.target.value });
        if(e.target.name === 'valine') await this.setState({ valine: e.target.value });
        if(e.target.name === 'L_Carnitine') await this.setState({ L_Carnitine: e.target.value });
        if(e.target.name === 'L_Glutamine') await this.setState({ L_Glutamine: e.target.value });
        if(e.target.name === 'L_Alanine') await this.setState({ L_Alanine: e.target.value });
        if(e.target.name === 'L_Lysine') await this.setState({ L_Lysine: e.target.value });
        if(e.target.name === 'methionine') await this.setState({ methionine: e.target.value });
        if(e.target.name === 'phenylalanine') await this.setState({ phenylalanine: e.target.value });
        if(e.target.name === 'threonine') await this.setState({ threonine: e.target.value });
        if(e.target.name === 'histidine') await this.setState({ histidine: e.target.value });
        if(e.target.name === 'tryptophan') await this.setState({ tryptophan: e.target.value });

        //other
        if(e.target.name === 'other') await this.setState({ other: e.target.value });
    }

    /* ajax request methods */
    ajaxSupplementCreate() {

        let data = new FormData();
        data.append('supplementType', this.state.supplementType);
        data.append('koreanName', `(${this.state.korComName}) ${this.state.korName}`);
        data.append('englishName', `(${this.state.engComName}) ${this.state.engName}`);
        data.append('image', this.state.image);
        data.append('flavor', this.state.flavor);
        data.append('marketLink', this.state.marketLink);
        data.append('price', this.state.price);
        data.append('servings', this.state.servings);
        data.append('description', this.state.description);
        data.append('proteinPerServing', this.state.proteinPerServing);
        data.append('fatPerServing', this.state.fatPerServing);
        data.append('carbohydratePerServing', this.state.carbohydratePerServing);
        data.append('source', this.state.source);
        data.append('leucine', this.state.leucine);
        data.append('isoLeucine', this.state.isoLeucine);
        data.append('valine', this.state.valine);
        data.append('L_Carnitine', this.state.L_Carnitine);
        data.append('L_Glutamine', this.state.L_Glutamine);
        data.append('L_Alanine', this.state.L_Alanine);
        data.append('L_Lysine', this.state.L_Lysine);
        data.append('methionine', this.state.methionine);
        data.append('phenylalanine', this.state.phenylalanine);
        data.append('threonine', this.state.threonine);
        data.append('histidine', this.state.histidine);
        data.append('tryptophan', this.state.tryptophan);
        data.append('other', this.state.other);

        apiUtil.sendRequest({
            setLoading: this.setLoading,
            url: `/api/admin/supplement`,
            method: apiUtil.methods.POST,
            data: data,
            isForm: true,
            success: (result) => {
                this.toggleModal('confirmModalIsOpen', false);

                this.setAlertMessage('보조제 생성이 완료되었습니다.');
                this.setAlertRedirectUrl('/supplement/list');
                this.toggleModal('alertModalIsOpen', true);
            },
            fail: (message) => {
                this.toggleModal('confirmModalIsOpen', false);

                this.setAlertMessage(`보조제 생성에 실패했습니다.\n${message}`);
                this.toggleModal('alertModalIsOpen', true);
            }
        })
    }

    render() {
        const { confirmMethod, confirmMessage, alertRedirectUrl, alertMessage } = this.state;
        const { confirmModalIsOpen, alertModalIsOpen } = this.state;

        return (
            <React.Fragment>
                <Loading loading={this.state.loading}/>
                <table>
                    <tbody>
                    <tr>
                        <td>보조제 종류</td>
                        <td>
                            <select value={this.state.supplementType} name='supplementType' onChange={this.handleInputChange}>
                                <option value='Protein'>Protein</option>
                                <option value='Gainer'>Gainer</option>
                                <option value='AminoAcid'>AminoAcid</option>
                                <option value='Other'>Other</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>제조사 이름 (KOR)</td>
                        <td><input type='text' name='korComName' value={this.state.korComName} onChange={this.handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td>제조사 이름 (ENG)</td>
                        <td><input type='text' name='engComName' value={this.state.engComName} onChange={this.handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td>보조제 이름 (KOR)</td>
                        <td><input type='text' name='korName' value={this.state.korName} onChange={this.handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td>보조제 이름 (ENG)</td>
                        <td><input type='text' name='engName' value={this.state.engName} onChange={this.handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td>보조제 이미지</td>
                        <td><input type='file' name='image' onChange={this.handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td>맛</td>
                        <td><input type='text' name='flavor' value={this.state.flavor} onChange={this.handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td>마켓 링크</td>
                        <td><input type='text' name='marketLink' value={this.state.marketLink} onChange={this.handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td>가격</td>
                        <td><input type='text' name='price' value={this.state.price} onChange={this.handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td>용량 (1스쿱)</td>
                        <td><input type='text' name='servings' value={this.state.servings} onChange={this.handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td>설명</td>
                        <td><textarea name='description' value={this.state.description} onChange={this.handleInputChange}/></td>
                    </tr>
                    {(this.state.supplementType === 'Gainer' || this.state.supplementType === 'Protein') && (
                        <React.Fragment>
                            <tr>
                                <td>proteinPerServing</td>
                                <td><input type='text' name='proteinPerServing' value={this.state.proteinPerServing} onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>fatPerServing</td>
                                <td><input type='text' name='fatPerServing' value={this.state.fatPerServing} onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>carbohydratePerServing</td>
                                <td><input type='text' name='carbohydratePerServing' value={this.state.carbohydratePerServing} onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>source</td>
                                <td><input type='text' name='source' value={this.state.source} onChange={this.handleInputChange}/></td>
                            </tr>
                        </React.Fragment>
                    )}
                    {(this.state.supplementType === 'AminoAcid') && (
                        <React.Fragment>
                            <tr>
                                <td>Leucine</td>
                                <td><input type='text' name='leucine' value={this.state.leucine} onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>IsoLeucine</td>
                                <td><input type='text' name='isoLeucine' value={this.state.isoLeucine} onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>Valine</td>
                                <td><input type='text' name='valine' value={this.state.valine} onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>L_Carnitine</td>
                                <td><input type='text' name='L_Carnitine' value={this.state.L_Carnitine} onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>L_Glutamine</td>
                                <td><input type='text' name='L_Glutamine' value={this.state.L_Glutamine} onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>L_Alanine</td>
                                <td><input type='text' name='L_Alanine' value={this.state.L_Alanine} onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>L_Lysine</td>
                                <td><input type='text' name='L_Lysine' value={this.state.L_Lysine} onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>methionine</td>
                                <td><input type='text' name='methionine' value={this.state.methionine} onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>phenylalanine</td>
                                <td><input type='text' name='phenylalanine' value={this.state.phenylalanine} onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>threonine</td>
                                <td><input type='text' name='threonine' value={this.state.threonine} onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>histidine</td>
                                <td><input type='text' name='histidine' value={this.state.histidine} onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>tryptophan</td>
                                <td><input type='text' name='tryptophan' value={this.state.tryptophan} onChange={this.handleInputChange}/></td>
                            </tr>
                        </React.Fragment>
                    )}
                    {(this.state.supplementType === 'Other') && (
                        <React.Fragment>
                            <tr>
                                <td>other</td>
                                <td><input type='text' name='other' value={this.state.other} onChange={this.handleInputChange}/></td>
                            </tr>
                        </React.Fragment>
                    )}
                    </tbody>
                </table>
                <button onClick={this.handleCreateBtnClick}>생성</button>
                <ConfirmModal
                    isOpen={confirmModalIsOpen}
                    onRequestClose={() => {
                        this.toggleModal('confirmModalIsOpen', false)
                    }}
                    confirmMethod={confirmMethod}
                    message={confirmMessage}
                />
                <AlertModal
                    isOpen={alertModalIsOpen}
                    onRequestClose={() => {
                        this.toggleModal('alertModalIsOpen', false)
                    }}
                    redirectUrl={alertRedirectUrl}
                    message={alertMessage}
                />
            </React.Fragment>
        )
    }
}

export default SupplementCreateContainer;